
import { useState } from 'react'
import { FiSearch, FiFilter } from 'react-icons/fi'

const SearchBar = ({ setSearchTerm }) => {
    const [filterOpen, setFilterOpen] = useState(false)

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(`Buscando Pokémon: ${event.target.value}`)
        }
    }

    const toggleFilter = () => {
        setFilterOpen(!filterOpen)
    }

    return (
        <div className="flex flex-col items-center pb-12">
            <div className="relative w-full md:w-1/2">
                <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
                    <button 
                        className="p-2" 
                        onClick={toggleFilter}
                    >
                        <FiFilter className="text-gray-600" />
                    </button>
                    <input
                        type="text"
                        placeholder="Buscar Pokémon..."
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="flex-grow py-2 px-4 rounded-r-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <div className="p-2">
                        <FiSearch className="text-gray-600" />
                    </div>
                </div>
                {filterOpen && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md p-4 z-10">
                        {/* Aquí van tus filtros */}
                        <h4 className="font-bold">Filtros:</h4>
                        <div className="mt-2">
                            <label className="block">
                                <input type="checkbox" className="mr-2" />
                                Filtro 1
                            </label>
                            <label className="block">
                                <input type="checkbox" className="mr-2" />
                                Filtro 2
                            </label>
                            <label className="block">
                                <input type="checkbox" className="mr-2" />
                                Filtro 3
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar