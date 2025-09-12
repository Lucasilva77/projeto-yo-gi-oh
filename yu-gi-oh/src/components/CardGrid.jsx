export default function CardGrid({ cards, loading }) {
  if (loading) return <p>Carregando cartas...</p>;
  if (!cards || cards.length === 0) return <p>Nenhuma carta encontrada.</p>;

  const usdToBrl = 5.4; // taxa dólar -> real
  const taxaExtra = 15; // valor fixo em reais

  return (
    <div className="cards">
      {cards.map((card) => {
        const basePrice =
          Number(card.card_prices[0].tcgplayer_price) * usdToBrl;
        const finalPrice = basePrice + taxaExtra;

        return (
          <div key={card.id} className="card">
            <img
              src={card.card_images[0].image_url}
              alt={card.name}
              className="card-img"
            />
            <p className="title">{card.name}</p>

            {card.card_prices && card.card_prices.length > 0 && (
              <div className="prices">
                <p className="price">
                  <strong>Preço:</strong>{" "}
                  {finalPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            )}

            <button className="btn-buy" onClick={() => addToCart(card)}>
              COMPRAR
            </button>
          </div>
        );
      })}
    </div>
  );
}
