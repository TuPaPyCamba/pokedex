import { useState, useEffect } from 'react' // Importa los hooks useState y useEffect de React
import PokemonCard from '../../components/PokemonCard/PokemonCard' // Importa el componente PokemonCard para mostrar información sobre un Pokémon
import Layout from '../../components/UI/Layout' // Importa el componente Layout para proporcionar un diseño estructurado al componente
import { Link } from 'react-router-dom' // Importa el componente Link de react-router-dom para la navegación entre rutas

/**
 * Componente que muestra la lista de Pokémon favoritos del usuario.
 * 
 * Este componente recupera los Pokémon favoritos almacenados en el localStorage
 * y los muestra en una cuadrícula. Si no hay favoritos, se muestra un mensaje
 * indicando que no hay Pokémon favoritos aún.
 * 
 * @returns {JSX.Element} Un elemento que muestra la lista de Pokémon favoritos.
 */
function Favorites() {
    // Estado para almacenar la lista de Pokémon favoritos
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        // Recupera los Pokémon favoritos del localStorage al cargar el componente
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        setFavorites(storedFavorites) // Actualiza el estado con los Pokémon favoritos
    }, []) // Se ejecuta una vez al montar el componente

    return (
        <Layout>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5 ">Lista de Favoritos</h1>
            <div className='flex justify-center mt-10'>
                <div className="grid grid-cols-1 gap-4 450px:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {favorites.length > 0 ? ( // Verifica si hay Pokémon favoritos
                        favorites.map((pokemon) => (
                            <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
                                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                            </Link>
                        ))
                    ) : (
                        <p>No hay Pokémons favoritos aún.</p> // Mensaje si no hay favoritos
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Favorites
