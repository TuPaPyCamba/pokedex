


const SearchBar = ({ setSearchTerm }) => {
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(`Buscando Pokémon: ${event.target.value}`);
        }
    };

    return (
        <input
            type="text"
            placeholder="Buscar Pokémon..."
            onChange={handleChange}
            onKeyDown={handleKeyDown} 
        />
    );
};

export default SearchBar;