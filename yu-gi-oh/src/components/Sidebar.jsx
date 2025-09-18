import { useState } from "react";

export default function Sidebar({
  selectedTypes,
  toggleType,
  selectedRaces,
  toggleRace,
  selectedArchetypes,
  toggleArchetype,
  selectedAttributes,
  toggleAttribute,
  onSearch,
  onClear,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const races = [
    "Dragon","Spellcaster","Warrior","Zombie","Machine","Beast","Fiend","Fairy",
    "Insect","Dinosaur","Aqua","Pyro","Thunder","Rock","Plant","Winged Beast",
    "Sea Serpent","Reptile","Fish","Psychic","Divine-Beast","Cyberse","Creator God",
  ];

  const types = [
    "Normal Monster","Effect Monster","Fusion Monster","Ritual Monster",
    "Synchro Monster","XYZ Monster","Pendulum Effect Monster","Link Monster",
    "Spell Card","Trap Card",
  ];

  const archetypes = [
    "Blue-Eyes","Dark Magician","Elemental HERO","Red-Eyes","Blackwing","Cyber Dragon"
  ];

  const attributes = [
    "Dark","Light","Water","Fire","Earth","Wind","Divine"
  ];

  return (
    <>
     
      <div className={`filters ${isOpen ? "open" : ""}`}>
        <h2 className="titulo_filter">FILTROS</h2>

        {/* Raças */}
        <div className="filters_tipo">
          <h3>TIPOS</h3>
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

        {/* Tipos */}
        <div className="filters_tipo">
          <h3>TIPOS DE CARTA</h3>
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

        {/* Archetypes */}
        <div className="filters_tipo">
          <h3>ARQUÉTIPOS</h3>
          <div>
            {archetypes.map((arch) => (
              <label key={arch}>
                <input
                  type="checkbox"
                  checked={selectedArchetypes.includes(arch)}
                  onChange={() => toggleArchetype(arch)}
                />
                {arch}
              </label>
            ))}
          </div>
        </div>

        {/* Attributes */}
        <div className="filters_tipo">
          <h3>ATRIBUTOS</h3>
          <div>
            {attributes.map((attr) => (
              <label key={attr}>
                <input
                  type="checkbox"
                  checked={selectedAttributes.includes(attr)}
                  onChange={() => toggleAttribute(attr)}
                />
                {attr}
              </label>
            ))}
          </div>
        </div>

        {/* Botões */}
        <div className="filter-buttons">
          <button type="button" onClick={onSearch}>
            Pesquisar
          </button>
          <button type="button" onClick={onClear}>
            Limpar Filtros
          </button>
        </div>
      </div>
    </>
  );
}
