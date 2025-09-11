import "./App.css";
import abacaxi from "./assets/abacaxi.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CardGrid from "./components/CardGrid";
import Banner from "./components/Banner";

export default function App() {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // filtros
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // tema
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // alternar checkboxes
  const toggleRace = (race) => {
    setSelectedRaces((prev) =>
      prev.includes(race) ? prev.filter((r) => r !== race) : [...prev, race]
    );
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // buscar cartas
  const fetchCards = async () => {
    setLoading(true);
    try {
      const url =
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=300&offset=0";
      const res = await axios.get(url);
      setAllCards(res.data.data);
      setCards(res.data.data.slice(0, 40));
    } catch (err) {
      console.error("Erro ao buscar cartas:", err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  // aplicar filtros no front
  const applyFilters = () => {
    let filtered = [...allCards];

    if (search) {
      filtered = filtered.filter((card) =>
        card.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedRaces.length > 0) {
      filtered = filtered.filter((card) => selectedRaces.includes(card.race));
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((card) => selectedTypes.includes(card.type));
    }

    setCards(filtered.slice(0, 40));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Header
        search={search}
        setSearch={setSearch}
        onSearch={applyFilters}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      <div className="content">
        <Sidebar
          selectedRaces={selectedRaces}
          toggleRace={toggleRace}
          selectedTypes={selectedTypes}
          toggleType={toggleType}
          onSearch={applyFilters}
          onClear={() => {
            setSelectedRaces([]);
            setSelectedTypes([]);
            setSearch("");
            setCards(allCards.slice(0, 40));
          }}
        />

        <main className="main">
          {/* Banner rotativo */}
          <Banner />

          <CardGrid cards={cards} loading={loading} />
        </main>
      </div>

      <footer className="footer">
        <div className="footer-content">
          © 2023 FPR Animes - Todos os direitos reservados.
        </div>
        <img src={abacaxi} alt="Mascote FPR" className="footer-logo" />
      </footer>
    </div>
  );
}
