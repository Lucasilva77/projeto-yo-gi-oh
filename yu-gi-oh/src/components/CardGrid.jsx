export default function CardGrid({ cards, loading }) {
  if (loading) return <p>Carregando cartas...</p>;
  if (!cards || cards.length === 0) return <p>Nenhuma carta encontrada.</p>;

  return (
    <div className="cards">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <img
            src={card.card_images[0].image_url}
            alt={card.name}
            className="card-img"
          />
          <p className="title">{card.name}</p>
          <p className="price">ID: {card.id}</p>
          <button className="btn-buy">COMPRAR</button>
        </div>
      ))}
    </div>
  );
}
