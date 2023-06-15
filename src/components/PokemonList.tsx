import React from "react"
import "./PokemonList.css"

interface Props {
    name: string
    id: number
    image: string
    type: string
}

function PokemonList(props: Props) {

    const {name, id, image, type } = props

    return <div className="container">
                <div className={`pokemon-list-container ${type} `}>
                    <p className="pokemon-id">#{id}</p>
                    <p className="pokemon-name">{name}</p>
                    <img src={image} alt={name} />
                    <p className="pokemon-type">Type : {type}</p>
                </div>
            </div>
}

export default PokemonList