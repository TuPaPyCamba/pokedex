
const Pagination = ({ page, setPage, totalPokemons }) => {
    const totalPages = Math.ceil(totalPokemons / 10); 

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
                Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;