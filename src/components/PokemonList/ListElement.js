import typeColors from "../../styles/typeColors"
import React, { useEffect, useState } from 'react'
import axios from "axios"

const PokemonList = ({ pokemonName }) => {
    const [pokemonData, setPokemonData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                setPokemonData(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()
    }, [pokemonName])

    if (loading) {
        return <p></p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    // Asegúrate de que pokemonData y pokemonData.types existen antes de usarlos
    const primaryType = pokemonData.types[0]?.type.name
    const backgroundColor = typeColors[primaryType] || '#FFFFFF'

    return (
        <div className="p-4 border rounded-lg shadow-sm flex flex-row mb-5 hover:shadow-lg hover:scale-105 transform transition-transform duration-300">
            <div className="mr-4 rounded-lg" style={{ backgroundColor }}>
                <img
                    src={pokemonData.sprites?.front_default || 'URL_DE_IMAGEN_POR_DEFECTO'}
                    alt={pokemonData.name}
                    className="mx-auto my-auto moving hover:animate-none"
                />
            </div>
            <div>
                <h3>{pokemonData.name}</h3>
                <p>Tipos: <strong>{pokemonData.types.map(type => type.type.name).join(', ')}</strong></p>
                <p>Altura: {pokemonData.height}</p>
                <p>Peso: {pokemonData.weight}</p>
            </div>
        </div>
    )
}

export default PokemonList;