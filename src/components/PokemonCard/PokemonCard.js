import typeColors from "../../styles/typeColors"

const PokemonCard = ({ pokemon }) => {
    const pokemonType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';

    return (
        <div 
            className="rounded-2xl shadow-xl w-64 450px:w-44 border border-gray-300 hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 p-4"
            style={{
                background: `linear-gradient(135deg, ${typeColors[pokemonType]} 0%, rgba(255, 255, 255, 0.2) 100%)`,
                backdropFilter: 'blur(5px)',
            }}
        >
            <h3 className="text-center font-bold text-xl mb-4">{pokemon.name}</h3>
            <div className="w-full bg-black aspect-[1/1] rounded-3xl relative overflow-hidden group">
                {/* Parte superior de la Pokébola */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-3xl transition-transform duration-300 ease-in-out group-hover:-translate-y-10" style={{ height: '45%' }}></div>

                {/* Parte inferior de la Pokébola */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-3xl transition-transform duration-300 ease-in-out group-hover:translate-y-10" style={{ height: '45%' }}></div>

                {/* Círculo negro en el medio */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black rounded-full border-4 border-white"></div>

                {/* Imagen del Pokémon */}
                {pokemon.sprites && pokemon.sprites.front_default ? (
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                    />
                ) : (
                    <p>No image available</p>
                )}
            </div>
        </div>
    )
}

export default PokemonCard