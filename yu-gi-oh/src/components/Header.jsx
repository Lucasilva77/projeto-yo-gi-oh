import logo from "../assets/logo.png";
import cartIcon from "../assets/cart.png"; // seu carrinho PNG

export default function Header({
  search,
  setSearch,
  onSearch,
  onToggleTheme,
  theme,
}) {
  return (
    <header className="header flex items-center justify-between px-6 py-3 bg-[#1c1c1c] text-white">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="FPR Logo" className="logo-img h-12" />
      </div>

      {/* Barra de pesquisa */}
      <div className="search-bar relative w-80">
        <input
          type="text"
          placeholder="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={onSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800"
        >
          {/* Ícone SVG personalizado */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 105.293 14.293l4.853 4.854 1.414-1.414-4.854-4.853A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
        </button>
      </div>

      {/* Botões à direita */}
      <div className="header-buttons flex items-center gap-4">
        {/* Carrinho */}
        <button className="cart flex items-center justify-center w-[50px] h-[50px] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md hover:scale-110 transition-transform">
          <img src={cartIcon} alt="Carrinho" className="w-6 h-6" />
        </button>

        {/* Trocar tema */}
        <button
          onClick={onToggleTheme}
          className="theme-toggle flex items-center justify-center w-[50px] h-[50px] rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 shadow-md hover:scale-110 transition-transform"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
