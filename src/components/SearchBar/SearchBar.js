import { useState, useEffect, useRef } from 'react' // Importa hooks de React
import { FiSearch, FiFilter } from 'react-icons/fi' // Importa íconos para búsqueda y filtro

/**
 * Componente de barra de búsqueda y filtros para Pokémon.
 * 
 * Este componente permite a los usuarios buscar Pokémon mediante un campo de entrada y 
 * aplicar filtros a través de un menú desplegable. Cuando el usuario escribe en el campo 
 * de búsqueda, el término se actualiza y se registra en la consola si se presiona 'Enter'.
 * El menú de filtros permite seleccionar tipos de Pokémon específicos, y se cierra automáticamente
 * al hacer clic fuera de él.
 * 
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {function} props.setSearchTerm - Función que actualiza el término de búsqueda.
 * @param {Array} props.types - Un arreglo de objetos que representan los tipos de Pokémon.
 * Cada objeto debe tener al menos la propiedad `name`, que se utiliza para mostrar en el menú de filtros.
 * @param {Array} props.selectedTypes - Un arreglo de los tipos de Pokémon que están actualmente seleccionados.
 * @param {function} props.toggleType - Función que alterna la selección de un tipo específico de Pokémon.
 * 
 * @returns {JSX.Element} Un componente que incluye un campo de búsqueda y un menú de filtros para Pokémon.
 */
const SearchBar = ({ setSearchTerm, types, selectedTypes, toggleType }) => {
    const [filterOpen, setFilterOpen] = useState(false) // Estado para controlar si el menú de filtros está abierto
    const filterRef = useRef(null) // Referencia para el menú de filtros

    // Maneja el cambio en el campo de búsqueda
    const handleChange = (event) => {
        setSearchTerm(event.target.value) // Actualiza el término de búsqueda
    };

    // Maneja la pulsación de la tecla 'Enter' en el campo de búsqueda
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(`Buscando Pokémon: ${event.target.value}`) // Muestra en consola el término buscado
        }
    };

    // Alterna el estado del menú de filtros
    const toggleFilterDropdown = () => {
        setFilterOpen(!filterOpen)
    };

    // Efecto para cerrar el menú de filtros al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                // Oculta el menú de filtros si se hace clic fuera
                setFilterOpen(false)
            }
        };

        if (filterOpen) {
            document.addEventListener('mousedown', handleClickOutside) // Añade el evento de clic
        } else {
            document.removeEventListener('mousedown', handleClickOutside) // Elimina el evento si no está abierto
        }

        // Limpieza al desmontar el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, [filterOpen])

    return (
        <div className="flex flex-col items-center pb-4">
            <div className="relative w-full md:w-1/2">
                <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
                    <button 
                        className="p-2" 
                        onClick={toggleFilterDropdown} // Alterna el menú de filtros
                    >
                        <FiFilter className="text-gray-600" /> {/* Icono de filtro */}
                    </button>
                    <input
                        type="text"
                        placeholder="Buscar Pokémon..."
                        onChange={handleChange} // Maneja cambios en el campo de búsqueda
                        onKeyDown={handleKeyDown} // Maneja pulsaciones de tecla
                        className="flex-grow py-2 px-4 rounded-r-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <div className="p-2">
                        <FiSearch className="text-gray-600" /> {/* Icono de búsqueda */}
                    </div>
                </div>

                {/* Menú de filtros desplegable */}
                {filterOpen && (
                    <div ref={filterRef} className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md p-4 z-10">
                        <h4 className="font-bold">Filtros:</h4>
                        <div className="mt-2">
                            {types.map(type => (
                                <label key={type.name} className="block">
                                    <input 
                                        type="checkbox" 
                                        onChange={() => toggleType(type.name)} // Alterna el tipo seleccionado
                                        className="mr-2" 
                                        checked={selectedTypes.includes(type.name)} // Marca el checkbox si el tipo está seleccionado
                                    />
                                    {type.name} {/* Nombre del tipo */}
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