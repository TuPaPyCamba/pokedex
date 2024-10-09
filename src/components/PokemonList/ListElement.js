import typeColors from "../../styles/typeColors" // Objeto que contiene los colores asociados a los tipos de Pokémon.
import { useEffect, useState } from 'react' // Importa hooks de React para manejar el estado y efectos secundarios
import axios from "axios" // Importa Axios para realizar solicitudes HTTP

/**
 * Componente que muestra la información detallada de un Pokémon.
 * 
 * Este componente recibe el nombre de un Pokémon y obtiene su información desde 
 * la API de PokéAPI. Luego, renderiza su imagen, tipos, altura y peso en una tarjeta.
 * 
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {string} props.pokemonName - El nombre del Pokémon para obtener sus detalles.
 * 
 * @returns {JSX.Element} Un elemento que muestra la información del Pokémon.
 */
const PokemonList = ({ pokemonName }) => {
    const [pokemonData, setPokemonData] = useState(null) // Estado para almacenar la información del Pokémon
    const [loading, setLoading] = useState(true) // Estado para manejar la carga de datos
    const [error, setError] = useState(null) // Estado para manejar errores en la carga de datos

    useEffect(() => {
        // Función asíncrona para obtener los datos del Pokémon
        const fetchPokemonData = async () => {
            try {
                // Solicita datos del Pokémon a la API
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                setPokemonData(response.data) // Actualiza el estado con los datos obtenidos
            } catch (error) {
                setError(error.message) // Establece el mensaje de error en caso de fallo
            } finally {
                setLoading(false) // Cambia el estado de carga a falso al finalizar
            }
        }

        fetchPokemonData() // Llama a la función para obtener los datos
    }, [pokemonName]) // Ejecuta el efecto cuando cambie el nombre del Pokémon

    if (loading) {
        return <p></p> // Muestra un mensaje de carga (actualmente vacío)
    }

    if (error) {
        return <p>Error: {error}</p> // Muestra un mensaje de error si hay un problema
    }

    // Asegúrate de que pokemonData y pokemonData.types existen antes de usarlos
    const primaryType = pokemonData.types[0]?.type.name // Obtiene el tipo primario del Pokémon
    const backgroundColor = typeColors[primaryType] || '#FFFFFF' // Asigna color de fondo basado en el tipo

    return (
        <div className="p-4 border rounded-lg shadow-sm flex flex-row mb-5 hover:shadow-lg hover:scale-105 transform transition-transform duration-300">
            <div className="mr-4 rounded-lg" style={{ backgroundColor }}>
                <img
                    src={pokemonData.sprites?.front_default || 'URL_DE_IMAGEN_POR_DEFECTO'} // Muestra la imagen del Pokémon
                    alt={pokemonData.name} // Alt text para la imagen
                    className="mx-auto my-auto moving hover:animate-none"
                />
            </div>
            <div>
                <h3>{pokemonData.name}</h3> {/* Nombre del Pokémon */}
                <p>Tipos: <strong>{pokemonData.types.map(type => type.type.name).join(', ')}</strong></p> {/* Tipos del Pokémon */}
                <p>Altura: {pokemonData.height}</p> {/* Altura del Pokémon */}
                <p>Peso: {pokemonData.weight}</p> {/* Peso del Pokémon */}
            </div>
        </div>
    )
}

export default PokemonList
