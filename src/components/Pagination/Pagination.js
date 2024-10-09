/**
 * Componente de paginación para navegar entre páginas de Pokémon.
 * 
 * Este componente permite al usuario navegar entre diferentes páginas de resultados
 * de Pokémon, mostrando controles para retroceder, avanzar, y seleccionar números de
 * página específicos. La paginación se adapta automáticamente en función del total
 * de Pokémon y la página actual.
 * 
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {number} props.page - La página actual seleccionada.
 * @param {function} props.setPage - Función para actualizar la página actual.
 * @param {number} props.totalPokemons - El número total de Pokémon disponibles.
 * 
 * @returns {JSX.Element} Un conjunto de botones de paginación para navegar entre páginas.
 */
const Pagination = ({ page, setPage, totalPokemons }) => {
    // Calcula el total de páginas basado en el total de Pokémon y el tamaño de página (10).
    const totalPages = Math.ceil(totalPokemons / 10)

    // Maneja la lógica para retroceder una página.
    const handleBack = () => {
        if (page > 1) setPage(page - 1)
    }

    // Maneja la lógica para avanzar a la siguiente página.
    const handleNext = () => {
        if (page < totalPages) setPage(page + 1)
    }

    // Maneja la selección de una página específica al hacer clic en un número de página.
    const handlePageClick = (pageNumber) => {
        setPage(pageNumber)
    }

    /**
     * Función para obtener los números de páginas que se mostrarán en la paginación.
     * Muestra hasta 3 números centrales alrededor de la página actual.
     * 
     * @returns {number[]} Un arreglo con los números de páginas que se deben mostrar.
     */
    const getPaginationNumbers = () => {
        const pageNumbers = []
        const totalNumbers = 3 // Mostrar solo 3 números centrales
        
        // Si hay menos de 5 páginas, mostrar todas las páginas entre 1 y totalPages
        if (totalPages <= 5) {
            for (let i = 2; i < totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            // Si está cerca del inicio (páginas 1 a 3)
            if (page <= 3) {
                for (let i = 2; i <= 4; i++) {
                    pageNumbers.push(i)
                }
            }
            // Si está cerca del final
            else if (page >= totalPages - 2) {
                for (let i = totalPages - 3; i < totalPages; i++) {
                    pageNumbers.push(i)
                }
            }
            // Si está en el medio
            else {
                const startPage = page - Math.floor(totalNumbers / 2)
                for (let i = startPage; i < startPage + totalNumbers; i++) {
                    pageNumbers.push(i)
                }
            }
        }
        
        return pageNumbers
    }

    return (
        <div className="flex items-center justify-center mt-8 space-x-2">
            {/* Botón para retroceder a la página anterior */}
            {page > 1 && (
                <button
                    onClick={handleBack}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Back
                </button>
            )}

            {/* Botón para la página 1 */}
            <button
                onClick={() => handlePageClick(1)}
                className={`px-3 py-2 rounded ${page === 1 ? 'bg-poke-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                1
            </button>

            {/* Botones para números de páginas intermedias */}
            {getPaginationNumbers().map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-3 py-2 rounded ${page === pageNumber ? 'bg-poke-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {pageNumber}
                </button>
            ))}

            {/* Botón para la última página */}
            <button
                onClick={() => handlePageClick(totalPages)}
                className={`px-3 py-2 rounded ${page === totalPages ? 'bg-poke-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                {totalPages}
            </button>

            {/* Botón para avanzar a la siguiente página */}
            {page < totalPages && (
                <button
                    onClick={handleNext}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Next
                </button>
            )}
        </div>
    )
}

export default Pagination