import { useState, useEffect } from 'react' // Importa hooks de React para manejar el estado y efectos secundarios
import axios from 'axios' // Importa Axios para realizar solicitudes HTTP
import PokemonList from '../../components/PokemonList/PokemonList.js' // Importa el componente para mostrar la lista de Pokémon
import SearchBar from '../../components/SearchBar/SearchBar.js' // Importa la barra de búsqueda
import Pagination from '../../components/Pagination/Pagination.js' // Importa el componente de paginación
import Layout from '../../components/UI/Layout.js' // Importa el diseño de la interfaz de usuario

/**
 * Componente principal Catalog
 * Este componente gestiona la visualización de una lista de Pokémon, permitiendo realizar búsquedas y aplicar filtros.
 * Muestra una barra de búsqueda, una lista de Pokémon filtrados, y la paginación de los resultados.
 * 
 * @returns {JSX.Element} El componente Catalog renderiza la UI con una lista de Pokémon, controles de búsqueda y paginación.
 */
const Catalog = () => {
  // Estado para almacenar todos los Pokémon y los que se mostrarán en la página
  const [allPokemons, setAllPokemons] = useState([])
  const [displayedPokemons, setDisplayedPokemons] = useState([])
  const [page, setPage] = useState(1) // Estado para la página actual
  const [searchTerm, setSearchTerm] = useState('') // Estado para el término de búsqueda
  const [totalPokemons, setTotalPokemons] = useState(0) // Total de Pokémon disponibles
  const [filters, setFilters] = useState({}) // Filtros aplicados en la búsqueda
  const [types, setTypes] = useState([]) // Tipos de Pokémon disponibles
  const [selectedTypes, setSelectedTypes] = useState([]) // Tipos seleccionados por el usuario
  const [isLoading, setIsLoading] = useState(true) // Indicador de carga
  const [isLoadingComplete, setIsLoadingComplete] = useState(false) // Indicador de carga completada
  const pokemonsPerPage = 10 // Número de Pokémon a mostrar por página
  const concurrentRequests = 5 // Número de solicitudes concurrentes a la API

  // Función para obtener Pokémon en lotes
  const fetchPokemonInBatches = async (urls, limit) => {
    let results = []
    for (let i = 0; i < urls.length; i += limit) {
      const batch = urls.slice(i, i + limit) // Se divide la URL en lotes
      const responses = await Promise.all(batch.map(url => axios.get(url).then(res => res.data))) // Se obtienen los datos de cada URL
      results.push(...responses) // Se agregan los resultados a la lista final
    }
    return results // Devuelve los resultados obtenidos
  }

  // Efecto para cargar los Pokémon y tipos al montar el componente
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true) // Inicia la carga
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1005`) // Obtiene la lista de Pokémon
        const pokemonUrls = response.data.results.map(pokemon => pokemon.url) // Mapea las URLs de cada Pokémon

        const pokemonsWithTypes = await fetchPokemonInBatches(pokemonUrls, concurrentRequests) // Obtiene detalles de los Pokémon

        // Actualiza el estado con los Pokémon obtenidos
        setAllPokemons(pokemonsWithTypes)
        setTotalPokemons(pokemonsWithTypes.length) // Actualiza el total de Pokémon
        setDisplayedPokemons(pokemonsWithTypes.slice(0, pokemonsPerPage)) // Muestra los Pokémon de la primera página
        setIsLoadingComplete(true) // Marca la carga como completada
      } catch (error) {
        console.error("Error al cargar los datos:", error.message) // Manejo de errores
      } finally {
        setIsLoading(false) // Finaliza el indicador de carga
      }
    }

    // Efecto para obtener los tipos de Pokémon
    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type/') // Obtiene los tipos de Pokémon
      setTypes(response.data.results) // Actualiza el estado con los tipos obtenidos
    }

    fetchPokemons() // Llama a la función para obtener Pokémon
    fetchTypes() // Llama a la función para obtener tipos
  }, [])

  // Efecto para filtrar los Pokémon según los términos de búsqueda y filtros seleccionados
  useEffect(() => {
    const filteredPokemons = allPokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) // Coincide con el término de búsqueda
      const matchesFilters = Object.keys(filters).every(key => filters[key]) // Coincide con los filtros seleccionados

      const pokemonTypes = pokemon.types.map(type => type.type.name) // Mapea los tipos del Pokémon
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.some(type => pokemonTypes.includes(type)) // Coincide con los tipos seleccionados

      return matchesSearch && matchesFilters && matchesTypes // Devuelve verdadero si coincide con todos los criterios
    })

    // Cambia a la primera página si se aplican filtros o se realiza una búsqueda
    if (searchTerm || selectedTypes.length > 0) {
      setPage(1);
    }

    // Actualiza el estado con los Pokémon filtrados
    setDisplayedPokemons(filteredPokemons.slice((page - 1) * pokemonsPerPage, page * pokemonsPerPage))
    setTotalPokemons(filteredPokemons.length) // Actualiza el total de Pokémon
  }, [searchTerm, allPokemons, filters, selectedTypes, page])

  // Función para eliminar un filtro
  const removeFilter = (filterName) => {
    const updatedFilters = { ...filters }
    delete updatedFilters[filterName] // Elimina el filtro del estado
    setFilters(updatedFilters) // Actualiza el estado
  }

  // Función para alternar el estado de un tipo seleccionado
  const toggleType = (type) => {
    setSelectedTypes(prevSelectedTypes => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter(t => t !== type) // Elimina el tipo si ya está seleccionado
      } else {
        return [...prevSelectedTypes, type] // Agrega el tipo a los seleccionados
      }
    })
  }

  return (
    <Layout>
      <div>
        {/* Verifica si la carga de datos se completó antes de mostrar la barra de búsqueda */}
        {isLoadingComplete && (
          <SearchBar
            setSearchTerm={setSearchTerm} // Pasa la función para actualizar el término de búsqueda
            types={types} // Pasa la lista de tipos de Pokémon disponibles para filtrar
            selectedTypes={selectedTypes} // Pasa los tipos seleccionados por el usuario
            toggleType={toggleType} // Pasa la función para alternar la selección de tipos
          />
        )}

        {/* Contenedor para mostrar los filtros aplicados */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Muestra cada filtro aplicado como un elemento que se puede eliminar */}
          {Object.keys(filters).map((filterName) =>
            filters[filterName] && (
              <span key={filterName} className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center">
                {filterName} {/* Muestra el nombre del filtro actual */}
                <button
                  className="ml-2 text-white font-bold"
                  onClick={() => removeFilter(filterName)} // Elimina el filtro correspondiente al hacer clic
                >
                  &times;
                </button>
              </span>
            )
          )}
          {/* Muestra los tipos seleccionados por el usuario, cada uno con opción de eliminar */}
          {selectedTypes.map(type => (
            <span key={type} className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center">
              {type} {/* Muestra el tipo seleccionado */}
              <button
                className="ml-2 text-white font-bold"
                onClick={() => toggleType(type)} // Alterna la selección del tipo al hacer clic
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Manejo del estado de carga de Pokémon */}
        {isLoading ? (
          <div className="flex justify-center items-center flex-col h-64">
            {/* Muestra una imagen de la pokeball mientras se cargan los Pokémon */}
            <div className="pokeball">
              <img src='/pokeball.png' alt='pokeball' className='w-24 h-24' />
            </div>
            {/* Mensaje de espera */}
            <div className="mt-4 text-center">
              <p className="text-blue-500 font-bold">Capturando a los Pokémon, ¡por favor espera! no son fáciles de atrapar :(</p>
            </div>
          </div>
        ) : displayedPokemons.length === 0 ? (
          // Mensaje si no se encuentran resultados con los filtros aplicados
          <p className="text-red-500 font-bold">No se encontraron resultados con los filtros aplicados.</p>
        ) : (
          <>
            {/* Muestra la lista de Pokémon filtrados */}
            <PokemonList pokemons={displayedPokemons} />
            {/* Muestra la paginación para navegar a través de las páginas de resultados */}
            <Pagination page={page} setPage={setPage} totalPokemons={totalPokemons} />
          </>
        )}
      </div>
    </Layout>
  )
}

export default Catalog 