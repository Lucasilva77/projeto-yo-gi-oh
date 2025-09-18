import { useState } from "react";
import { useCart } from "./CartContext";
import Modal from "./Modal";

export default function CardGrid({ cards, loading }) {
  const { cart, addToCart } = useCart(); // <-- pega também o carrinho
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProduct, setModalProduct] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  if (loading) return <p>Carregando cartas...</p>;
  if (!cards || cards.length === 0) return <p>Nenhuma carta encontrada.</p>;

  const usdToBrl = 5.4;
  const taxaExtra = 15;

  const handleAddToCart = (card) => {
    const exists = cart.find((c) => c.id === card.id);

    if (exists) {
      // já no carrinho
      setIsDuplicate(true);
      setModalProduct(card.name);
      setModalVisible(true);
    } else {
      // novo produto
      addToCart(card);
      setIsDuplicate(false);
      setModalProduct(card.name);
      setModalVisible(true);
    }
  };

  return (
    <>
      <div className="card-grid">
        {cards.map((card) => {
          const basePrice =
            card.card_prices && card.card_prices.length > 0
              ? Number(card.card_prices[0].tcgplayer_price) * usdToBrl
              : 0;
          const finalPrice = basePrice > 0 ? basePrice + taxaExtra : null;

          return (
            <div key={card.id} className="card">
              <img
                src={card.card_images[0].image_url}
                alt={card.name}
                className="card-img"
              />
              <p className="title">{card.name}</p>

              {finalPrice ? (
                <p className="price">
                  {finalPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              ) : (
                <p className="price">Preço indisponível</p>
              )}

              <button
                className="btn-buy"
                onClick={() => handleAddToCart(card)}
              >
                COMPRAR
              </button>
            </div>
          );
        })}
      </div>

      <Modal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        productName={modalProduct}
        isDuplicate={isDuplicate} // <-- passa pro modal
      />
    </>
  );
}
