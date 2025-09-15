import { useState } from "react";

export default function Sidebar({
  selectedRaces,
  toggleRace,
  selectedTypes,
  toggleType,
  onSearch,
  onClear,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Lista de opções
  const races = [
    "Aqua", "Beast", "Beast Warrior", "Continuous", "Counter", "Creator God",
    "Cyberse", "Dark", "Dinosaur", "Divine Beast", "Dragon", "Earth",
    "Effect", "Fairy", "Fiend", "Fish", "Insect", "Machine", "Plant", "Pyro",
    "Reptile", "Rock", "Spellcaster", "Thunder", "Warrior", "Winged Beast",
    "Zombie"
  ];

  const types = [
    "Armadilha", "Counter", "Mágica", "Monstro", "Skill Card", "Token"
  ];

  return (
    <>
      {/* Botão mobile */}
      <button className="filters-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Fechar Filtros" : "Abrir Filtros"}
      </button>

      <div className={`filters ${isOpen ? "open" : ""}`}>
        <h2 className="titulo_filter">FILTROS</h2>

        {/* Filtros TIPO / ATRIBUTO */}
        <div className="filters_tipo">
          <h3>TIPO / ATRIBUTO</h3>
          <div>
            {races.map((race) => (
              <label key={race}>
                <input
                  type="checkbox"
                  checked={selectedRaces.includes(race)}
                  onChange={() => toggleRace(race)}
                />
                {race}
              </label>
            ))}
          </div>
        </div>

        {/* Filtros TIPO CARTA */}
        <div className="filters_tipo">
          <h3>TIPO CARTA</h3>
          <div>
            {types.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Botões */}
        <div className="filter-buttons">
          <button onClick={onSearch}>PESQUISAR</button>
          <button onClick={onClear}>LIMPAR FILTROS</button>
        </div>
      </div>
    </>
  );
}
