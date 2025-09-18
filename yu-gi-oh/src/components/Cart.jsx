import React from "react";
import { useCart } from "../components/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 20; // fixo por enquanto
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <h1>CARRINHO DE COMPRAS</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} width={80} />
              <div>
                <h3>{item.name}</h3>
                <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                <p>Quantidade: {item.quantity}</p>
                <p>Total: R$ {(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>
                  Remover
                </button>
              </div>
            </div>
          ))}

          <hr />
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Frete: R$ {shipping.toFixed(2)}</p>
          <h2>Total a pagar: R$ {total.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
}
