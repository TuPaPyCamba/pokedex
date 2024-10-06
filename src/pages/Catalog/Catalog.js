import { useState, useEffect } from 'react'; // Importa hooks de React
import axios from 'axios'; // Importa Axios para hacer solicitudes HTTP
import PokemonList from '../../components/PokemonList/PokemonList.js'; // Importa el componente que muestra la lista de Pokémon
import SearchBar from '../../components/SearchBar/SearchBar.js'; // Importa el componente de barra de búsqueda
import Pagination from '../../components/Pagination/Pagination.js'; // Importa el componente de paginación
import Layout from '../../components/UI/Layout.js';

const Catalog = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPokemons, setTotalPokemons] = useState(0);
  const pokemonsPerPage = 10; 

  // Efecto que se ejecuta al cambiar la página
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${(page - 1) * pokemonsPerPage}`);
      setAllPokemons(response.data.results);
      setTotalPokemons(response.data.count);
      setDisplayedPokemons(response.data.results);
    };

    fetchPokemons();
  }, [page, pokemonsPerPage]);

  // Efecto que filtra los Pokémon según el término de búsqueda
  useEffect(() => {
    const filteredPokemons = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setDisplayedPokemons(filteredPokemons);
  }, [searchTerm, allPokemons]);

  return (
    <Layout>
      <div>
        {/* Componente de barra de búsqueda */}
        <SearchBar setSearchTerm={setSearchTerm} />

        {/* Componente que muestra la lista de Pokémon filtrados */}
        <PokemonList pokemons={displayedPokemons} />

        {/* Componente de paginación que permite navegar entre páginas de Pokémon */}
        <Pagination page={page} setPage={setPage} totalPokemons={totalPokemons} />
      </div>
    </Layout>
  );
};

export default Catalog;