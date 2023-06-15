import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";

type ListedPokemon = {
  name: string;
  url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("")

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );

      setNextUrl(res.data.next)

      console.log(res.data.results);

      res.data.results.forEach(async (pokemon: ListedPokemon) => {
        const pokemonDetails = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const { id, name, sprites, types } = pokemonDetails.data 
        console.log(pokemonDetails.data);
        setPokemons((p) => [...p, { id, name, sprites, types}]);
      });
    };

    getPokemon();
  }, []);

  console.log(pokemons);

  const nextPage = async () => {

    let res = await axios.get(nextUrl)

    setNextUrl(res.data.next)

    res.data.results.forEach(async (pokemon: ListedPokemon) => {
      const pokemonDetails = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const { id, name, sprites, types } = pokemonDetails.data 
      console.log(pokemonDetails.data);
      setPokemons((p) => [...p, { id, name, sprites, types}]);
    });

  }

  return (
    <div className="App">
      <header className="pokedex-header">
        <div>
          <h1>Pokédex</h1>
          <p>by @ghallium</p>
        </div>
        <div>
          <p>Powered by <a href="https://pokeapi.co/">PokéAPI</a></p>
        </div>
      </header>
      <PokemonCollection pokemons={pokemons} />
      <button onClick={nextPage}>Charger</button>
    </div>
  );
}

export default App;
