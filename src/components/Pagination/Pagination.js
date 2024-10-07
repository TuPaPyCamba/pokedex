

const Pagination = ({ page, setPage, totalPokemons }) => {
    const totalPages = Math.ceil(totalPokemons / 10)

    const handleBack = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1)
    }

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber)
    }

    // Función para obtener los 3 números centrales
    const getPaginationNumbers = () => {
        const pageNumbers = []
        const totalNumbers = 3 // Mostrar solo 3 números centrales
        
        // Si hay menos de 5 páginas en total, se muestran todas las páginas entre 1 y totalPages
        if (totalPages <= 5) {
            for (let i = 2; i < totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            // Si está cerca del inicio
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
            {/* Botón Back */}
            {page > 1 && (
                <button
                    onClick={handleBack}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Back
                </button>
            )}

            {/* Página 1 */}
            <button
                onClick={() => handlePageClick(1)}
                className={`px-3 py-2 rounded ${page === 1 ? 'bg-poke-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                1
            </button>

            {/* Números intermedios */}
            {getPaginationNumbers().map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-3 py-2 rounded ${page === pageNumber ? 'bg-poke-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {pageNumber}
                </button>
            ))}

            {/* Última página */}
            <button
                onClick={() => handlePageClick(totalPages)}
                className={`px-3 py-2 rounded ${page === totalPages ? 'bg-poke-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                {totalPages}
            </button>

            {/* Botón Next */}
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