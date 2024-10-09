// Importaciones necesarias para la navegación y componentes de la aplicación.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // Importa componentes para el enrutamiento.
import Catalog from './pages/Catalog/Catalog.js' // Importa la página del catálogo de Pokémon.
import PokemonDetails from './pages/PokemonDetail/PokemonDetails.js' // Importa la página de detalles de un Pokémon específico.
import Favorites from './pages/Favorites/Favorites.js' // Importa la página de favoritos de Pokémon.
import Navbar from './components/UI/Navbar.js' // Importa el componente de navegación.
import Footer from './components/UI/Footer.js' // Importa el componente de pie de página.

// Componente principal de la aplicación.
function App() {
  return (
    <Router> {/* Proporciona la funcionalidad de enrutamiento a la aplicación */}
      <Navbar /> {/* Renderiza el componente de navegación */}
        <Routes> {/* Define las rutas de la aplicación */}
          <Route path='/' element={<Catalog />} /> {/* Ruta principal que renderiza el catálogo de Pokémon */}
          <Route path='/pokemon/:name' element={<PokemonDetails />} /> {/* Ruta para mostrar detalles de un Pokémon específico */}
          <Route path='/favorites' element={<Favorites />} /> {/* Ruta para mostrar la lista de favoritos */}
        </Routes>
      <Footer /> {/* Renderiza el componente de pie de página */}
    </Router>
  )
}

export default App // Exporta el componente principal para su uso en otros archivos.