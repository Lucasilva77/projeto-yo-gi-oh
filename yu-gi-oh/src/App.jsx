import "./App.css";
import logo from "./assets/logo.png";
import abacaxi from "./assets/abacaxi.png";
import { useState } from "react";

export default function App() {
  // Mock de produtos (12 cartas)
  const produtos = [...Array(40)].map((_, i) => ({
    id: i + 1,
    nome: `Carta ${i + 1}`,
    preco: "R$ 24,99",
    img: "https://via.placeholder.com/200x280",
  }));

  // Estado para paginação
  const [itensPorPagina, setItensPorPagina] = useState(12);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);

  // Produtos exibidos na página atual
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const exibidos = produtos.slice(inicio, fim);
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="FPR Logo" className="logo-img" />
        </div>

        {/* Barra de busca */}
        <div className="search-bar">
          <input type="text" placeholder="Pesquisar" />
          <button>🔍</button>
        </div>
 
        {/* Carrinho */}
        <button className="cart">🛒</button>
      </header>

      <div className="content">
        {/* Sidebar */}
       <aside className="sidebar">
  <h2 className="sidebar-title">FILTROS</h2>

  <div className="filter-section">
    <h3 className="filter-subtitle">TIPO / ATRIBUTO</h3>
    <div className="filter-list">
      {[
        "Aqua", "Beast", "Beast Warrior", "Continuos", "Counter", "Creator God",
        "Cyberse", "Dark", "Dinosaur", "Divine Beast", "Divino", "Dragon", "Earth",
        "Effect", "Equip", "Fairy", "Field", "Friend", "Fire", "Fish", "Flip",
        "Fusion", "Insect", "Light", "Link", "Machine", "Monster", "N/A", "Normal",
        "Pendulum", "Plant", "Psichic", "Pyro", "Quick-Play", "Reptile"
      ].map((attr) => (
        <label key={attr}>
          <input type="checkbox" /> {attr}
        </label>
      ))}
    </div>
  </div>

  <div className="filter-section">
    <h3 className="filter-subtitle">TIPO CARTA</h3>
    <div className="filter-list">
      {["Armadilha", "Counter", "Mágica", "Monstro", "Skill Card", "Token"].map(
        (tipo) => (
          <label key={tipo}>
            <input type="checkbox" /> {tipo}
          </label>
        )
      )}
    </div>
  </div>

  <div className="buttons">
    <button className="btn-search">PESQUISAR</button>
    <button className="btn-clear">LIMPAR FILTROS</button>
  </div>
</aside>


        {/* Conteúdo */}
        <main className="main">
          {/* Banner */}
          <div className="banner">
            <img src="https://via.placeholder.com/900x200" alt="Banner" />
          </div>

          {/* Grade de cards */}
          <div className="cards">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="card">
                <img src="https://via.placeholder.com/200x280" alt="Card" />
                <p className="title">Artnage Finnel</p>
                <p className="price">R$ 24,99</p>
                <button className="btn-buy">COMPRAR</button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          © 2023 FPR Animes - Todos os direitos reservados.
        </div>
        <img src={abacaxi} alt="Mascote FPR" className="footer-logo" />
      </footer>
    </div>
  );
}
