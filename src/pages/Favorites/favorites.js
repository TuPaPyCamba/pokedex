import { useState, useEffect } from 'react'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Layout from '../../components/UI/Layout'

function Favorites() {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        setFavorites(storedFavorites)
    }, [])

    return (
        <Layout>
            <h1>Favorite Pokémon</h1>
            <div className="favorites-list">
                {favorites.length > 0 ? (
                    favorites.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                ) : (
                    <p>No hay Pokémons favoritos aún.</p>
                )}
            </div>
        </Layout>
    );
};

export default Favorites
