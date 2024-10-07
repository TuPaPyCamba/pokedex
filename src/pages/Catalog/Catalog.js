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
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // Nuevo estado para SearchBar
  const pokemonsPerPage = 10

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)

        const pokemonsWithTypes = await Promise.all(response.data.results.map(async (pokemon) => {
          const detailsResponse = await axios.get(pokemon.url)
          return detailsResponse.data
        }))

        setAllPokemons(pokemonsWithTypes)
        setTotalPokemons(pokemonsWithTypes.length)
        setDisplayedPokemons(pokemonsWithTypes.slice(0, pokemonsPerPage))
      } catch (error) {
        console.error("Error al cargar los datos:", error.message)
      } finally {
        setIsLoading(false)
        setTimeout(() => {
          setIsLoadingComplete(true)
          setIsSearchBarVisible(true); // Mostrar el SearchBar después del timeout
        }, 3000)
      }
    }

    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type/')
      setTypes(response.data.results)
    }

    fetchPokemons()
    fetchTypes()
  }, [])

  useEffect(() => {
    const filteredPokemons = allPokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilters = Object.keys(filters).every(key => filters[key])

      const pokemonTypes = pokemon.types.map(type => type.type.name)
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.some(type => pokemonTypes.includes(type))

      return matchesSearch && matchesFilters && matchesTypes
    })

    setDisplayedPokemons(filteredPokemons.slice(0, pokemonsPerPage))
    setTotalPokemons(filteredPokemons.length)
    setPage(1)
  }, [searchTerm, allPokemons, filters, selectedTypes])

  const toggleFilter = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }))
  }

  const removeFilter = (filterName) => {
    const updatedFilters = { ...filters }
    delete updatedFilters[filterName]
    setFilters(updatedFilters)
  }

  const toggleType = (type) => {
    setSelectedTypes(prevSelectedTypes => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter(t => t !== type)
      } else {
        return [...prevSelectedTypes, type]
      }
    })
  }

  useEffect(() => {
    const filteredPokemons = allPokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilters = Object.keys(filters).every(key => filters[key])

      const pokemonTypes = pokemon.types.map(type => type.type.name)
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.some(type => pokemonTypes.includes(type))

      return matchesSearch && matchesFilters && matchesTypes
    })

    setDisplayedPokemons(filteredPokemons.slice((page - 1) * pokemonsPerPage, page * pokemonsPerPage))
  }, [page, allPokemons, searchTerm, filters, selectedTypes])

  return (
    <Layout>
      <div>
        {isSearchBarVisible && ( // Condicional para mostrar el SearchBar
          <SearchBar
            setSearchTerm={setSearchTerm}
            filters={filters}
            toggleFilter={toggleFilter}
            types={types}
            selectedTypes={selectedTypes}
            toggleType={toggleType}
          />
        )}
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
        {/* Pantalla de carga con Poké Ball animada */}
        {!isLoadingComplete ? (
          <div className="flex justify-center items-center flex-col h-64">
            <div className="pokeball">
              <img src='./pokeball.png' alt='pokeball' className='w-24 h-24' />
            </div>
            <div className="mt-4 text-center">
              <p className="text-blue-500 font-bold">Capturando a los Pokémon, ¡por favor espera! no son fáciles de atrapar :(</p>
            </div>
          </div>
        ) : isLoading ? (
          <p className="text-blue-500 font-bold">Cargando lista...</p>
        ) : displayedPokemons.length === 0 ? (
          <p className="text-red-500 font-bold">No se encontraron resultados con los filtros aplicados.</p>
        ) : (
          <>
            <PokemonList pokemons={displayedPokemons} />
            <Pagination page={page} setPage={setPage} totalPokemons={totalPokemons} />
          </>
        )}
      </div>
    </Layout>
  )
}

export default Catalog