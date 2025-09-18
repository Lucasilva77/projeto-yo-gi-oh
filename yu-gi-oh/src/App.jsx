import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CardGrid from "./components/CardGrid";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

import { useCart } from "./components/CartContext";

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

export default function MainPage() {
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedArchetypes, setSelectedArchetypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const { cart, addToCart, removeFromCart } = useCart();

  const toggleRace = (race) =>
    setSelectedRaces((prev) =>
      prev.includes(race) ? prev.filter((r) => r !== race) : [...prev, race]
    );

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const toggleArchetype = (arch) =>
    setSelectedArchetypes((prev) =>
      prev.includes(arch) ? prev.filter((a) => a !== arch) : [...prev, arch]
    );

  const toggleAttribute = (attr) =>
    setSelectedAttributes((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    );

  const buildUrl = () => {
    const baseUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
    const params = [];
    if (search) params.push(`fname=${encodeURIComponent(search)}`);
    if (selectedRaces.length > 0)
      params.push(`race=${encodeURIComponent(selectedRaces[0])}`);
    if (selectedTypes.length > 0)
      params.push(`type=${encodeURIComponent(selectedTypes[0])}`);
    if (selectedArchetypes.length > 0)
      params.push(`archetype=${encodeURIComponent(selectedArchetypes[0])}`);
    if (selectedAttributes.length > 0)
      params.push(`attribute=${encodeURIComponent(selectedAttributes[0])}`);
    return `${baseUrl}?${params.join("&")}`;
  };

  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await axios.get(buildUrl());
      setAllCards(res.data.data || []);
      setCurrentPage(1);
    } catch {
      setAllCards([]);
    } finally {
      setLoading(false);
    }
  };

  // Busca automática apenas quando filtros mudam, não ao digitar
  useEffect(() => {
    fetchCards();
  }, [selectedRaces, selectedTypes, selectedArchetypes, selectedAttributes]);

  const totalPages = Math.ceil(allCards.length / itemsPerPage);
  const paginatedCards = allCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <Header
        search={search}
        setSearch={setSearch}
        onSearch={fetchCards} // busca só ao clicar
        onToggleTheme={toggleTheme}
        theme={theme}
        cartCount={cart.length}
      />

      <div className="content">
        <Sidebar
          selectedRaces={selectedRaces}
          toggleRace={toggleRace}
          selectedTypes={selectedTypes}
          toggleType={toggleType}
          selectedArchetypes={selectedArchetypes}
          toggleArchetype={toggleArchetype}
          selectedAttributes={selectedAttributes}
          toggleAttribute={toggleAttribute}
          onSearch={() => fetchCards()}
          onClear={() => {
            setSelectedRaces([]);
            setSelectedTypes([]);
            setSelectedArchetypes([]);
            setSelectedAttributes([]);
            setSearch("");
            fetchCards();
          }}
        />
        <main className="main">
          <Banner />
          <div className="controls">
            <div className="items-per-page">
              <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <span>Itens por página:</span>
            </div>

            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {(() => {
                const maxButtons = 5;
                let startPage = Math.max(currentPage - 2, 1);
                let endPage = Math.min(startPage + maxButtons - 1, totalPages);
                startPage = Math.max(endPage - maxButtons + 1, 1);

                const buttons = [];
                for (let i = startPage; i <= endPage; i++) {
                  buttons.push(
                    <button
                      key={i}
                      className={i === currentPage ? "active" : ""}
                      onClick={() => handlePageChange(i)}
                    >
                      {i}
                    </button>
                  );
                }
                return buttons;
              })()}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                &gt;
              </button>
            </div>
          </div>
          <CardGrid cards={paginatedCards} loading={loading} />
        </main>
      </div>
      <Footer cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
}
