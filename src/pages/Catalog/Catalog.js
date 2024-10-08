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
  const pokemonsPerPage = 10
  const concurrentRequests = 5

  const fetchPokemonInBatches = async (urls, limit) => {
    let results = []
    for (let i = 0; i < urls.length; i += limit) {
      const batch = urls.slice(i, i + limit)
      const responses = await Promise.all(batch.map(url => axios.get(url).then(res => res.data)))
      results.push(...responses)
    }
    return results
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        const pokemonUrls = response.data.results.map(pokemon => pokemon.url)

        const pokemonsWithTypes = await fetchPokemonInBatches(pokemonUrls, concurrentRequests)

        setAllPokemons(pokemonsWithTypes);
        setTotalPokemons(pokemonsWithTypes.length);
        setDisplayedPokemons(pokemonsWithTypes.slice(0, pokemonsPerPage))
        setIsLoadingComplete(true)
      } catch (error) {
        console.error("Error al cargar los datos:", error.message)
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

  useEffect(() => {
    const filteredPokemons = allPokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilters = Object.keys(filters).every(key => filters[key])

      const pokemonTypes = pokemon.types.map(type => type.type.name)
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.some(type => pokemonTypes.includes(type))

      return matchesSearch && matchesFilters && matchesTypes
    })

    setDisplayedPokemons(filteredPokemons.slice((page - 1) * pokemonsPerPage, page * pokemonsPerPage))
    setTotalPokemons(filteredPokemons.length)
  }, [searchTerm, allPokemons, filters, selectedTypes, page])

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
  };

  const toggleType = (type) => {
    setSelectedTypes(prevSelectedTypes => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter(t => t !== type)
      } else {
        return [...prevSelectedTypes, type]
      }
    })
  }

  return (
    <Layout>
      <div>
        {isLoadingComplete && (
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
                  &times;
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
                &times;
              </button>
            </span>
          ))}
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center flex-col h-64">
            <div className="pokeball">
              <img src='/pokeball.png' alt='pokeball' className='w-24 h-24' />
            </div>
            <div className="mt-4 text-center">
              <p className="text-blue-500 font-bold">Capturando a los Pokémon, ¡por favor espera! no son fáciles de atrapar :(</p>
            </div>
          </div>
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