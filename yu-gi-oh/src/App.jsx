import abacaxi from "./assets/abacaxi.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CardGrid from "./components/CardGrid";
import Banner from "./components/Banner";
import "./styles/reset.css";
import "./styles/layout.css";
import "./styles/header.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import "./styles/cards.css";
import "./styles/footer.css";
import "./styles/pagination.css";
import "./styles/responsive.css";
import "./styles/Banner.css";

export default function App() {
  const [offset, setOffset] = useState(0);
  const [allCards, setAllCards] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // carrinho
  const [cart, setCart] = useState([]);

  const addToCart = (card) => setCart((prev) => [...prev, card]);
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((c) => c.id !== id));

  // filtros
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // paginação (front)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // tema
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const toggleRace = (race) =>
    setSelectedRaces((prev) =>
      prev.includes(race) ? prev.filter((r) => r !== race) : [...prev, race]
    );

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  // buscar cartas
  const fetchCards = async () => {
    setLoading(true);
    try {
      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?attribute=water&type=Link%20Monster&num=10&offset=${offset}`;
      const res = await axios.get(url);
      setAllCards(res.data.data);
    } catch (err) {
      console.error("Erro ao buscar cartas:", err);
      setAllCards([]);
    } finally {
      setLoading(false);
    }
  };

  // sempre buscar quando offset mudar
  useEffect(() => {
    fetchCards();
  }, [offset]);

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

    return filtered;
  };

  const filteredCards = applyFilters();
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

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
            setCurrentPage(1);
          }}
        />

        <main className="main">
          {/* Banner rotativo */}
          <Banner />

          {/* Controles embaixo do banner */}
          <div className="controls">
            <div className="items-per-page">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <span>itens por página</span>
            </div>

            <div className="pagination">
              <button
                onClick={() => setOffset((o) => Math.max(o - 10, 0))}
                disabled={offset === 0}
              >
                &lt;
              </button>
              <button onClick={() => setOffset((o) => o + 10)}>&gt;</button>
            </div>
          </div>

          {/* Grid de cards */}
          <CardGrid
            cards={filteredCards.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            loading={loading}
            addToCart={addToCart}
          />
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
