import logo from "../assets/logo.png";
import cartIcon from "../assets/cart.png";

export default function Header({
  search,
  setSearch,
  onSearch,       // função que será chamada ao clicar no botão
  onToggleTheme,
  theme,
  cartCount,
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
          onChange={(e) => setSearch(e.target.value)} // atualiza apenas o estado
          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={onSearch} // busca só ao clicar
          className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 105.293 14.293l4.853 4.854 1.414-1.414-4.854-4.853A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
        </button>
      </div>

      {/* Botões à direita */}
      <div className="header-buttons flex items-center gap-4">
        <div className="relative">
          <button className="cart-button">
            <img src={cartIcon} alt="Carrinho" className="w-6 h-6" />
          </button>

          {cartCount > 0 && (
            <span className="cart-count absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
