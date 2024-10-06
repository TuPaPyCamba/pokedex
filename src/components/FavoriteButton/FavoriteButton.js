import { useState, useEffect } from 'react'

const FavoriteButton = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  // Cargar la lista de favoritos desde localStorage cuando el componente se monta
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
    const isFavorited = favorites.some((favPokemon) => favPokemon.name === pokemon.name)
    setIsFavorite(isFavorited)
  }, [pokemon.name])

  // Función para añadir un Pokémon a favoritos
  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
    favorites.push(pokemon)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    setIsFavorite(true); // Cambia el estado a favorito
  }

  // Función para eliminar un Pokémon de favoritos
  const removeFromFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []
    favorites = favorites.filter((favPokemon) => favPokemon.name !== pokemon.name)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    setIsFavorite(false); // Cambia el estado a no favorito
  }


  // Render del botón con funcionalidad dinámica
  return (
    <button
      onClick={isFavorite ? removeFromFavorites : addToFavorites}
      className={`flex items-center justify-center p-2 pl-4 pr-4 border rounded-md transition-colors duration-200 transform hover:scale-90 ${isFavorite ? 'bg-black text-white' : 'bg-poke-blue text-white'
        } hover:bg-poke-red hover:text-white`}
    >
      {isFavorite ? (
        <>
          <span className="mr-2">Eliminar de favoritos</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m2 0v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6h12z" />
          </svg>
        </>
      ) : (
        <>
          <span className="mr-2">Agregar a Favoritos</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </>
      )}
    </button>
  )
}

export default FavoriteButton