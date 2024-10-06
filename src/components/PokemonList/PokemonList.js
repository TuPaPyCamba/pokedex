import { Link } from "react-router-dom"
import ListElement from './ListElement'

const PokemonList = ({ pokemons }) => {
    return (
        <div>
            {pokemons.map(pokemon => (
                <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
                    <ListElement pokemonName={pokemon.name} /> 
                </Link>
            ))}
        </div>
    )
}

export default PokemonList