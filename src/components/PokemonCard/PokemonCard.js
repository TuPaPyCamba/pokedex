const PokemonCard = ({ pokemon }) => {
    return (
        <div>
            <h3>{pokemon.name}</h3>
            {pokemon.sprites && pokemon.sprites.front_default ? (
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            ) : (
                <p>No image available</p>
            )}
        </div>
    )
}

export default PokemonCard