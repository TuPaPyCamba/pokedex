import { Link } from "react-router-dom"  // Importa el componente Link de react-router-dom para la navegación entre rutas
import ListElement from './ListElement' // Importa el componente ListElement para mostrar información sobre un Pokémon

/**
 * Componente que renderiza una lista de Pokémon.
 * 
 * Este componente recibe una lista de objetos Pokémon y genera un enlace para cada uno.
 * Cada enlace lleva a una página de detalles del Pokémon correspondiente.
 * 
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Array} props.pokemons - Un arreglo de objetos que representan los Pokémon.
 * Cada objeto debe tener al menos la propiedad `name`, que se utiliza para crear el enlace.
 * 
 * @returns {JSX.Element} Un conjunto de enlaces que representan la lista de Pokémon.
 */
const PokemonList = ({ pokemons }) => {
    return (
        <div>
            {/* Mapeo de cada Pokémon para crear un enlace hacia su página de detalles */}
            {pokemons.map(pokemon => (
                <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
                    {/* Renderiza un elemento de lista para cada Pokémon */}
                    <ListElement pokemonName={pokemon.name} /> 
                </Link>
            ))}
        </div>
    )
}

export default PokemonList