import { useState, useEffect } from 'react' // Importa hooks de React para manejar el estado y efectos secundarios
import PokemonCard from '../../components/PokemonCard/PokemonCard' // Importa la tarjeta de presentacion pokemon
import Layout from '../../components/UI/Layout' // Importa el diseño de la interfaz de usuario
import { Link } from 'react-router-dom' // Importa el componente Link de react-router-dom para la navegación entre rutas
import SearchBar from '../../components/SearchBar/SearchBar' // Importa la barra de búsqueda

/**
 * Componente Favorites que muestra la lista de Pokémon favoritos del usuario.
 * Permite buscar Pokémon por nombre y filtrar por tipos.
 */
function Favorites() {
    const [favorites, setFavorites] = useState([]) // Estado para almacenar los Pokémon favoritos
    const [searchTerm, setSearchTerm] = useState('') // Estado para almacenar el término de búsqueda
    const [selectedTypes, setSelectedTypes] = useState([]) // Estado para almacenar los tipos seleccionados
    const [types, setTypes] = useState([]) // Estado para almacenar los tipos únicos como objetos

    useEffect(() => {
        // Obtener los Pokémon favoritos almacenados en localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
        setFavorites(storedFavorites);

        // Extraer tipos únicos como objetos de los Pokémon favoritos
        const uniqueTypes = Array.from(new Set(storedFavorites.flatMap(pokemon => 
            pokemon.types.map(type => type.type.name) // Solo el nombre del tipo
        ))).map(typeName => ({
            name: typeName,
            // Puedes agregar otras propiedades aquí si es necesario
        }))

        setTypes(uniqueTypes); // Establecer los tipos únicos como objetos
    }, [])

    /**
     * Función para alternar la selección de tipos.
     * Si el tipo ya está seleccionado, se elimina; si no, se agrega.
     * @param {string} typeName - Nombre del tipo a alternar.
     */
    const toggleType = (typeName) => {
        setSelectedTypes((prev) => 
            prev.includes(typeName) 
                ? prev.filter((type) => type !== typeName) 
                : [...prev, typeName]
        )
    }

    // Filtrar favoritos según el término de búsqueda y tipos seleccionados
    const filteredFavorites = favorites.filter(pokemon => {
        const matchesSearchTerm = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedTypes.length === 0 || pokemon.types.some(type => selectedTypes.includes(type.type.name))
        return matchesSearchTerm && matchesType
    })

    /**
     * Función para eliminar un filtro de tipo.
     * Si el tipo está seleccionado, se elimina de la lista de tipos seleccionados.
     * @param {string} filterName - Nombre del tipo a eliminar.
     */
    const removeFilter = (filterName) => {
        if (selectedTypes.includes(filterName)) {
            toggleType(filterName) // Elimina el tipo de Pokémon
        }
    }

    return (
        <Layout>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5">Lista de Favoritos</h1>

            {/* Integración de SearchBar */}
            <SearchBar
                setSearchTerm={setSearchTerm}
                types={types}  // Pasar los tipos como objetos a SearchBar
                selectedTypes={selectedTypes}
                toggleType={toggleType}
            />

            {/* Contenedor para mostrar los filtros aplicados */}
            <div className="flex flex-wrap gap-2 mb-4">
                {selectedTypes.map(type => (
                    <span key={type} className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center">
                        {type}
                        <button
                            className="ml-2 text-white font-bold"
                            onClick={() => removeFilter(type)}
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>

            <div className='flex justify-center mt-10'>
                <div className="grid grid-cols-1 gap-4 450px:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredFavorites.length > 0 ? (
                        filteredFavorites.map((pokemon) => (
                            <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
                                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                            </Link>
                        ))
                    ) : (
                        <p>No hay Pokémons favoritos que coincidan con la búsqueda.</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Favorites