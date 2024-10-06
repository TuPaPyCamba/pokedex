import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Catalog from './pages/Catalog/Catalog.js'
import PokemonDetails from './pages/PokemonDetail/PokemonDetails.js'
import Favorites from './pages/Favorites/favorites.js'
import Navbar from './components/UI/Navbar.js'
import Footer from './components/UI/Footer.js'

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Catalog />} />
          <Route path='/pokemon/:name' element={<PokemonDetails />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      <Footer />
    </Router>
  )
}

export default App
