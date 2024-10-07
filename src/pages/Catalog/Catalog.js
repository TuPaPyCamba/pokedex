import { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonList from '../../components/PokemonList/PokemonList.js'
import SearchBar from '../../components/SearchBar/SearchBar.js'
import Pagination from '../../components/Pagination/Pagination.js'
import Layout from '../../components/UI/Layout.js'

const Catalog = () => {
  const [allPokemons, setAllPokemons] = useState([])
  const [displayedPokemons, setDisplayedPokemons] = useState([])
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [totalPokemons, setTotalPokemons] = useState(0)
  const [filters, setFilters] = useState({})
  const [types, setTypes] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const pokemonsPerPage = 10

  // Efecto que se ejecuta al cargar el componente para obtener tipos y pokémons
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)

        // Realiza solicitudes adicionales para obtener detalles de cada Pokémon
        const pokemonsWithTypes = await Promise.all(response.data.results.map(async (pokemon) => {
          const detailsResponse = await axios.get(pokemon.url)
          return detailsResponse.data
        }))

        // Actualiza el estado con los Pokémon obtenidos
        setAllPokemons(pokemonsWithTypes)
        setTotalPokemons(pokemonsWithTypes.length)
        setDisplayedPokemons(pokemonsWithTypes.slice(0, pokemonsPerPage))
      } catch (error) {
        console.error("Seguimos cargando los datos solicitados", error.message)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type/')
      setTypes(response.data.results)
    }

    fetchPokemons()
    fetchTypes()
  }, [])

  // Efecto que filtra los Pokémon según el término de búsqueda y los filtros
  useEffect(() => {
    const filteredPokemons = allPokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilters = Object.keys(filters).every(key => filters[key])

      const pokemonTypes = pokemon.types.map(type => type.type.name)
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.some(type => pokemonTypes.includes(type))

      return matchesSearch && matchesFilters && matchesTypes
    })

    setDisplayedPokemons(filteredPokemons.slice(0, pokemonsPerPage)) // Mostrar solo los primeros Pokémon filtrados
    setTotalPokemons(filteredPokemons.length) // Actualizar el total de Pokémon filtrados
    setPage(1) // Reiniciar la página al aplicar un filtro
  }, [searchTerm, allPokemons, filters, selectedTypes])

  // Función para agregar o eliminar un filtro
  const toggleFilter = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }))
  }

  // Función para eliminar un filtro específico
  const removeFilter = (filterName) => {
    const updatedFilters = { ...filters }
    delete updatedFilters[filterName]
    setFilters(updatedFilters)
  }

  // Función para agregar o eliminar un tipo seleccionado
  const toggleType = (type) => {
    setSelectedTypes(prevSelectedTypes => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter(t => t !== type)
      } else {
        return [...prevSelectedTypes, type]
      }
    })
  }

  // Efecto que maneja la paginación para los Pokémon mostrados
  useEffect(() => {
    const filteredPokemons = allPokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilters = Object.keys(filters).every(key => filters[key])

      const pokemonTypes = pokemon.types.map(type => type.type.name)
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.some(type => pokemonTypes.includes(type))

      return matchesSearch && matchesFilters && matchesTypes
    })

    setDisplayedPokemons(filteredPokemons.slice((page - 1) * pokemonsPerPage, page * pokemonsPerPage)) // Actualizar los Pokémon mostrados según la página
  }, [page, allPokemons, searchTerm, filters, selectedTypes])

  return (
    <Layout>
      <div>
        {/* Componente de barra de búsqueda */}
        <SearchBar
          setSearchTerm={setSearchTerm}
          filters={filters}
          toggleFilter={toggleFilter}
          types={types}
          selectedTypes={selectedTypes}
          toggleType={toggleType}
        />

        {/* Mostrar filtros aplicados */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(filters).map((filterName) =>
            filters[filterName] && (
              <span key={filterName} className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center">
                {filterName}
                <button
                  className="ml-2 text-white font-bold"
                  onClick={() => removeFilter(filterName)}
                >
                  &times; {/* Icono de cerrar */}
                </button>
              </span>
            )
          )}
          {selectedTypes.map(type => (
            <span key={type} className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center">
              {type}
              <button
                className="ml-2 text-white font-bold"
                onClick={() => toggleType(type)}
              >
                &times; {/* Icono de cerrar */}
              </button>
            </span>
          ))}
        </div>

        {/* Mostrar mensaje de carga y resultados */}
        {isLoading ? (
          <p className="text-blue-500 font-bold">Cargando lista...</p>
        ) : isLoading === false ? (
          <>
            {/* Componente que muestra la lista de Pokémon filtrados */}
            <PokemonList pokemons={displayedPokemons} />
            {/* Componente de paginación que permite navegar entre páginas de Pokémon */}
            <Pagination page={page} setPage={setPage} totalPokemons={totalPokemons} />
          </>
        ) : isLoading === false && displayedPokemons.length === 0 (
          <p className="text-red-500 font-bold">No se encontraron resultados con los filtros aplicados.</p>
        )}
      </div>
    </Layout>
  )
}

export default Catalog