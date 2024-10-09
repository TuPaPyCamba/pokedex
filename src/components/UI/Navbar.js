import { useState } from 'react' // Importa el hook useState
import { Link } from 'react-router-dom' // Importa Link para la navegación

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false) // Estado para controlar el menú desplegable

    // Función para alternar el estado del menú
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    // Función para cerrar el menú al hacer clic en un enlace
    const handleLinkClick = () => {
        setIsOpen(false)
    }

    return (
        <nav className="bg-poke-red h-[120px] w-full top-0 left-0 z-50 fixed">
            <div className="flex justify-between items-center px-4 mx-auto max-w-[1200px] h-full">
                {/* Logotipo a la izquierda */}
                <Link to="/">
                    <img src="/pokedex.png" alt="Logotipo" className="h-15 cursor-pointer transition-transform duration-200 transform hover:scale-110" />
                </Link>

                {/* Botón de menú de hamburguesa en pantallas pequeñas */}
                <div className="block lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {/* Icono de menú de hamburguesa */}
                        <svg className="w-10 h-10" fill="none" stroke="yellow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Enlaces a la derecha */}
                <div className={`hidden lg:flex space-x-4`}>
                    <Link to='/favorites'>
                        <div className="text-white font-bold py-2 px-4 bg-poke-blue rounded-md hover:scale-110">Favoritos</div>
                    </Link>
                    <Link to='/'>
                        <div className="text-white font-bold py-2 px-4 bg-poke-blue rounded-md hover:scale-110">Catálogo</div>
                    </Link>
                </div>
            </div>

            {/* Línea roja debajo del navbar */}
            <div className="bg-black h-2 w-full" />

            {/* Menú desplegable en pantallas pequeñas */}
            {isOpen && (
                <div className="lg:hidden absolute top-16 right-0 bg-white text-black w-48 shadow-lg rounded-lg">
                    <Link to='/favorites' onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-200">Favoritos</div>
                    </Link>
                    <Link to='/' onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-200">Catálogo</div>
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar // Exporta el componente Navbar