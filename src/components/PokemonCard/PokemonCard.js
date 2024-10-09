import typeColors from "../../styles/typeColors"  // Objeto que contiene los colores asociados a los tipos de Pokémon.

/**
 * Componente que representa una tarjeta de Pokémon.
 * 
 * Este componente muestra información visual sobre un Pokémon específico,
 * incluyendo su nombre y una imagen, utilizando un fondo que varía según su tipo.
 * La tarjeta tiene un diseño interactivo que responde al paso del ratón,
 * permitiendo una experiencia más atractiva.
 * 
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Object} props.pokemon - Un objeto que representa un Pokémon.
 * Debe contener las propiedades `name`, `types`, y `sprites`.
 * 
 * @returns {JSX.Element} Una tarjeta visual que muestra el nombre y la imagen del Pokémon
 * junto con un fondo estilizado.
 */
const PokemonCard = ({ pokemon }) => {
    // Obtiene el tipo del Pokémon, asignando 'normal' si no hay tipos definidos
    const pokemonType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal'
    
    // Determina el color de fondo basado en el tipo del Pokémon
    const backgroundColor = typeColors[pokemonType] || '#A8A77A'

    return (
        <div className="w-64 450px:w-44 h-[230px] shadow-md bg-[#FDFEFF] rounded-lg overflow-hidden border border-gray-300 hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 group">
            {/* Sección superior con un fondo de gradiente */}
            <div className="w-full h-[40%]" style={{
                backgroundImage: `linear-gradient(135deg, ${backgroundColor}, #ffffff)`
            }}>
            </div>

            {/* Sección central con el nombre del Pokémon */}
            <div className="w-full h-[60%] flex justify-center items-center p-4 shadow-up">
                <h3 className="text-center font-bold text-xl mt-8 group-hover:mt-12">{pokemon.name}</h3>
            </div>

            {/* Diseño de Pokébola que contiene la imagen del Pokémon */}
            <div className="absolute left-1/2 top-[40%] shadow-xl transform transition-transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-black rounded-full overflow-hidden group-hover:scale-125">
                {/* Parte superior de la Pokébola */}
                <div className="absolute top-0 left-0 w-full h-[48%] bg-red-500 transition-transform duration-300 ease-in-out group-hover:-translate-y-10"></div>

                {/* Parte inferior de la Pokébola */}
                <div className="absolute bottom-0 left-0 w-full h-[48%] bg-white transition-transform duration-300 ease-in-out group-hover:translate-y-10"></div>

                {/* Franja negra en el centro de la Pokébola */}
                <div className="absolute top-1/2 left-0 w-full h-3 bg-black transform -translate-y-1/2"></div>

                {/* Círculo negro en el medio de la Pokébola */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full border-8 border-black"></div>

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