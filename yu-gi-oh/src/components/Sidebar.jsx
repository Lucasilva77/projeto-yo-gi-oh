// src/components/Sidebar.jsx
export default function Sidebar({
  selectedRaces,
  toggleRace,
  selectedTypes,
  toggleType,
  onSearch,
  onClear,
}) {
  const races = [
    "Aqua", "Beast", "Beast Warrior", "Cyberse", "Dinosaur", "Divine-Beast",
    "Dragon", "Fairy", "Fiend", "Fish", "Insect", "Machine", "Plant", "Pyro",
    "Reptile", "Rock", "Sea Serpent", "Spellcaster", "Thunder", "Warrior",
    "Winged Beast", "Zombie"
  ];

  const types = [
    "Normal Monster",
    "Effect Monster",
    "Fusion Monster",
    "Ritual Monster",
    "Synchro Monster",
    "Xyz Monster",
    "Link Monster",
    "Spell Card",
    "Trap Card"
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">FILTROS</h2>

      <div className="filter-section">
        <h3 className="filter-subtitle">TIPO / ATRIBUTO</h3>
        <div className="filter-list">
          {races.map((race) => (
            <label key={race}>
              <input
                type="checkbox"
                checked={selectedRaces.includes(race)}
                onChange={() => toggleRace(race)}
              />{" "}
              {race}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-subtitle">TIPO CARTA</h3>
        <div className="filter-list">
          {types.map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />{" "}
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="buttons">
        <button className="btn-search" onClick={onSearch}>
          PESQUISAR
        </button>
        <button className="btn-clear" onClick={onClear}>
          LIMPAR FILTROS
        </button>
      </div>
    </aside>
  );
}
