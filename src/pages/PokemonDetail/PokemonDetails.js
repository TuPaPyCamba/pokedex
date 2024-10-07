import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton"
import axios from "axios"
import Layout from '../../components/UI/Layout'
import typeColors from "../../styles/typeColors"

const PokemonDetails = () => {
    const { name } = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                setPokemon(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        };

        fetchPokemonDetails()
    }, [name])

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error: {error}</div>
    if (!pokemon) return null

    // Obtener el primer tipo del Pokémon para determinar el color
    const primaryType = pokemon.types[0]?.type.name
    const backgroundColor = typeColors[primaryType] || '#FFFFFF'

    return (
        <Layout>
            <div className="flex flex-col md:flex-row w-full mb-10">
                <div style={{ backgroundColor }} className="rounded-xl">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="h-72 w-72 mx-auto my-auto moving hover:animate-none" />
                </div>
                <div className="md:ml-14 mt-10 md:mt-0 md:flex-grow space-y-4 text-black text-lg">
                    <div className="flex justify-between flex-col w-full 450px:flex-row 768px:flex-col lg:flex-row">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-5 ">{pokemon.name}</h1>
                        <FavoriteButton pokemon={pokemon} />
                    </div>
                    <p><strong>Tipos: </strong>{pokemon.types.map(type => type.type.name).join(', ')}</p>
                    <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Peso: </strong>{pokemon.weight / 10} kg</p>
                    <p><strong>Habilidades: </strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                    <p><strong>Experiencia Base: </strong> {pokemon.base_experience}</p>
                </div>
            </div>
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