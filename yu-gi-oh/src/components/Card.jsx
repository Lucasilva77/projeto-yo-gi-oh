
export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow text-center text-gray-600">
        Carrinho vazio 🛒
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-3">Carrinho 🛒</h2>
      <ul className="space-y-2">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>
              {item.name}{" "}
              <span className="text-sm text-gray-500">x{item.qty}</span>
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={clearCart}
        className="mt-4 w-full px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        Limpar Carrinho
      </button>
    </div>
  );
}
