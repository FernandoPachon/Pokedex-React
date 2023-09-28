import React, { useState, useEffect } from "react";

function Pokedex() {
  const [pokemon, setPokemon] = useState({});
  const [pokeId, setPokeId] = useState(); // ID del usuario que quieres obtener
  const [displayedMoves, setDisplayedMoves] = useState(5);
  const [displayedAbilities, setDisplayedAbilities] = useState(5);

  useEffect(() => {
    // Llamada a la API para obtener los datos del usuario
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [pokeId]);
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    poison:"#B97FC9",
    bug:"#729F3F",
    fairy:"#FDB9E9",
    ground:"#AB9842",
    dark:"#707070",
    psychic:"#F366B9",
    dragon:"#F16E57",
    flying:"#3DC7EF",
    rock:"#A38C21",
    ice:"#51C4E7",
    fighting:"#D56723",
    steel:"#9EB7B8",
    ghost:"#7B62A3",

    // Agrega más colores según los tipos
  };
  const handleInput = (event) => {
    setPokeId(event.target.value);
  };
  const handleLoadMoreMoves = () => {
    // Aumentar la cantidad de movimientos mostrados
    setDisplayedMoves(displayedMoves + 3);
  };
  const handleLoadMoreAbilities = () => {
    // Aumentar la cantidad de habilidades mostradas
    setDisplayedAbilities(displayedAbilities + 3);
  };

  return (
    <div className="box">
      <div className="input">
        <h4>Ingresa un ID</h4>
        <input type="number" value={pokeId} onChange={handleInput} />
      </div>
      <div className="data">
        <p className="t">{pokemon.name}</p>
        <p className="t">N° {pokemon.id}</p>
      </div>
      <div className="container">
        <div className="imagen">
          {pokemon.sprites && (
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={"300px"}
            />
          )}
          {/* {pokemon.sprites && (
            <img
              src={pokemon.sprites.back_default}
              alt={pokemon.name}
              width={"300px"}
            />
          )} */}
        </div>
        <div className="estadisticas">
          {/*  columna uno */}
          <div className="columna">
            <div className="subContainer">
              <p className="title">Altura: </p>
              <p>{pokemon.height}</p>
            </div>
            <div className="subContainer">
              <p className="title">Peso: </p>
              <p>{pokemon.weight}</p>
            </div>
          </div>
          {/*   columna dos */}
          <div className="columna">
            {pokemon.moves && (
              <div>
                <p className="title">Movimientos:</p>
                <ul>
                  {pokemon.moves.slice(0, displayedMoves).map((move) => (
                    <li key={move.move.name}>{move.move.name}</li>
                  ))}
                </ul>
                {displayedMoves < pokemon.moves.length && (
                  <button className="btn" onClick={handleLoadMoreMoves}>
                    ver más
                  </button>
                )}
              </div>
            )}
            {pokemon.abilities && (
              <div>
                <p className="title">Habilidades:</p>
                <ul>
                  {pokemon.abilities
                    .slice(0, displayedAbilities)
                    .map((ability) => (
                      <li key={ability.ability.name}>{ability.ability.name}</li>
                    ))}
                </ul>
                {displayedAbilities < pokemon.abilities.length && (
                  <button onClick={handleLoadMoreAbilities}>
                    Mostrar más habilidades
                  </button>
                )}
              </div>
            )}
          </div>
          {/*  <div className="subContainer">
            <div>
              {" "}
              <p className="title">Id: </p>
            </div>
            <div>
              <p>{pokemon.id}</p>
            </div>
          </div>
          <div className="subContainer">
            <p className="title">Nombre: </p>
            <p>{pokemon.name}</p>
          </div> */}
        </div>
      </div>
      <div>
        <div>
          <p>Tipo</p>
          <ul className="tipo">
            {pokemon.types &&
              pokemon.types.map((type) => (
                <li
                  key={type.slot}
                  style={{ backgroundColor: typeColors[type.type.name] }}
                >
                  {type.type.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;