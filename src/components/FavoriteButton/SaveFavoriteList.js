export const getFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    console.log(favorites)
    return favorites
}