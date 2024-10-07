import { useState, useEffect } from 'react'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Layout from '../../components/UI/Layout'
import { Link } from 'react-router-dom'

function Favorites() {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        setFavorites(storedFavorites)
    }, [])

    return (
        <Layout>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5 ">Lista de Favoritos</h1>
            <div className='flex justify-center mt-10'>
                <div className="grid grid-cols-1 gap-4 450px:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {favorites.length > 0 ? (
                        favorites.map((pokemon) => (
                            <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
                                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                            </Link>
                        ))
                    ) : (
                        <p>No hay Pokémons favoritos aún.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Favorites
