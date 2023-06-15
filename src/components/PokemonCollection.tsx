import React from "react"
import { Pokemon } from "../interface"
import PokemonList from "./PokemonList";
import "./PokemonCollection.css";

interface Props {
    pokemons : Pokemon[]
}

const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons } = props
    
    return(
        <div className="collection-container">
            {
                pokemons.map((pokemon) => (
                    
                    <PokemonList 
                        key={pokemon.id}
                        name={pokemon.name}
                        id={pokemon.id}
                        image={pokemon.sprites.front_default}
                        type={pokemon.types[0].type.name}/>
                       
                ))
            }
        </div>
    ) 
}

export default PokemonCollection