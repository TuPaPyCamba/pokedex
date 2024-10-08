import { useState, useEffect, useRef } from 'react'
import { FiSearch, FiFilter } from 'react-icons/fi'

const SearchBar = ({ setSearchTerm, filters, toggleFilter, types, selectedTypes, toggleType }) => {
    const [filterOpen, setFilterOpen] = useState(false)
    const filterRef = useRef(null)

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(`Buscando Pokémon: ${event.target.value}`)
        }
    }

    const toggleFilterDropdown = () => {
        setFilterOpen(!filterOpen)
    }

    // Cierra el menú de filtros si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                // Ocultar el menú de filtros al hacer clic fuera
                setFilterOpen(false)
            }
        }

        if (filterOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [filterOpen])

    return (
        <div className="flex flex-col items-center pb-4">
            <div className="relative w-full md:w-1/2">
                <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
                    <button 
                        className="p-2" 
                        onClick={toggleFilterDropdown}
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
                    <div ref={filterRef} className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md p-4 z-10">
                        {/* Filtros */}
                        <h4 className="font-bold">Filtros:</h4>
                        <div className="mt-2">
                            {types.map(type => (
                                <label key={type.name} className="block">
                                    <input 
                                        type="checkbox" 
                                        onChange={() => toggleType(type.name)} 
                                        className="mr-2" 
                                        checked={selectedTypes.includes(type.name)} 
                                    />
                                    {type.name}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar