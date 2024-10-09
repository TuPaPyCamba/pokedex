import { useParams } from "react-router-dom" // Hook para acceder a los parámetros de la URL.
import { useEffect, useState } from "react"  // Hooks para manejar el estado y efectos en componentes funcionales.
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton" // Componente para agregar Pokémon a favoritos.
import axios from "axios"  // Librería para hacer peticiones HTTP.
import Layout from '../../components/UI/Layout' // Componente de diseño general que envuelve el contenido.
import typeColors from "../../styles/typeColors" // Objeto que contiene los colores asociados a los tipos de Pokémon.

/**
 * Componente principal PokemonDetails
 * Este componente muestra los detalles de un Pokémon, incluyendo su imagen, tipos, altura, peso, habilidades, y estadísticas base.
 * 
 * @returns {JSX.Element} El componente PokemonDetails renderiza la UI con la información detallada del Pokémon.
 */
const PokemonDetails = () => {
    // Extraemos el parámetro "name" de la URL, que corresponde al nombre del Pokémon.
    const { name } = useParams()

    // Definimos el estado local para almacenar la información del Pokémon, manejar el estado de carga y posibles errores.
    const [pokemon, setPokemon] = useState(null)   // Estado para almacenar los datos del Pokémon.
    const [loading, setLoading] = useState(true)   // Estado para manejar la pantalla de carga.
    const [error, setError] = useState(null)       // Estado para manejar los errores de la solicitud.

    // useEffect se ejecuta una vez cuando el componente se monta y cada vez que "name" cambia.
    useEffect(() => {
        // Función asíncrona para obtener los detalles del Pokémon desde la PokeAPI.
        const fetchPokemonDetails = async () => {
            try {
                // Realizamos la solicitud HTTP a la PokeAPI utilizando Axios.
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                // Guardamos la información del Pokémon en el estado.
                setPokemon(response.data)
            } catch (error) {
                // Si ocurre un error, lo guardamos en el estado para mostrar un mensaje al usuario.
                setError(error.message)
            } finally {
                // Cambiamos el estado de carga a "false" una vez que la petición se completa.
                setLoading(false)
            }
        }

        fetchPokemonDetails()
    }, [name]) // Dependencia "name" para actualizar la información si el nombre en la URL cambia.

    // Si la aplicación está cargando, mostramos un mensaje de carga.
    if (loading) return <div>Cargando...</div>
    // Si hubo un error, mostramos el mensaje de error.
    if (error) return <div>Error: {error}</div>
    // Si no se ha obtenido ningún Pokémon, no renderizamos nada.
    if (!pokemon) return null

    // Obtenemos el primer tipo del Pokémon para determinar el color de fondo.
    const primaryType = pokemon.types[0]?.type.name
    const backgroundColor = typeColors[primaryType] || '#FFFFFF'

    return (
        <Layout>
            <div className="flex flex-col md:flex-row w-full mb-10">
                {/* Imagen del Pokémon con un fondo de color basado en su tipo */}
                <div style={{ backgroundColor }} className="rounded-xl">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="h-72 w-72 mx-auto my-auto moving hover:animate-none" />
                </div>
                {/* Detalles del Pokémon */}
                <div className="md:ml-14 mt-10 md:mt-0 md:flex-grow space-y-4 text-black text-lg">
                    <div className="flex justify-between flex-col w-full 450px:flex-row 768px:flex-col lg:flex-row">
                        {/* Nombre del Pokémon */}
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-5 ">{pokemon.name}</h1>
                        {/* Botón para agregar a favoritos */}
                        <FavoriteButton pokemon={pokemon} />
                    </div>
                    {/* Información general del Pokémon */}
                    <p><strong>Tipos: </strong>{pokemon.types.map(type => type.type.name).join(', ')}</p>
                    <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Peso: </strong>{pokemon.weight / 10} kg</p>
                    <p><strong>Habilidades: </strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                    <p><strong>Experiencia Base: </strong> {pokemon.base_experience}</p>
                </div>
            </div>
            {/* Más información del Pokémon */}
            <div className="text-black text-lg space-y-4">
                <h3 className="text-2xl font-bold">Más Información</h3>
                <p><strong>Movimientos: </strong> {pokemon.moves.slice(0, 3).map(move => move.move.name).join(', ')}</p>
                <p><strong>Estadísticas Base: </strong></p>
                <ul>
                    <li><strong>HP: </strong> {pokemon.stats[0].base_stat}</li>
                    <li><strong>Ataque: </strong> {pokemon.stats[1].base_stat}</li>
                    <li><strong>Defensa: </strong> {pokemon.stats[2].base_stat}</li>
                    <li><strong>Velocidad: </strong> {pokemon.stats[5].base_stat}</li>
                </ul>
                <p><strong>Índice de Juego: </strong> {pokemon.game_indices.map(index => index.version.name).join(', ')}</p>
                <p><strong>Especie: </strong> {pokemon.species.name}</p>
                <p><strong>Objetos que puede sostener: </strong> {pokemon.held_items.length > 0 ? pokemon.held_items.map(item => item.item.name).join(', ') : 'Ninguno'}</p>
                <p><strong>Evoluciones: </strong> {pokemon.evolutions ? pokemon.evolutions.join(', ') : 'Información no disponible'}</p>
            </div>
        </Layout>
    )
}

export default PokemonDetails