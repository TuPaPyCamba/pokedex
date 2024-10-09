// Importación de dependencias y componentes necesarios
import React from "react"; // Importa React para poder usar JSX
import { FaSquareXTwitter } from "react-icons/fa6"; // Icono de Twitter
import { FaFacebookSquare } from "react-icons/fa"; // Icono de Facebook
import { IoLogoInstagram } from "react-icons/io5"; // Icono de Instagram
import { Link } from "react-router-dom"; // Importa Link para la navegación

// Componente Footer que define el pie de página de la aplicación
const Footer = () => {
    return (
        <footer className="bg-poke-gray w-full text-white py-10"> {/* Estilos para el pie de página */}
            <div className="container max-w-[1200px] mx-auto flex flex-col justify-between px-4"> {/* Contenedor principal */}
                <div className="flex flex-col lg:flex-row lg:justify-between sm:flex-col"> {/* Flexbox para organizar contenido */}
                    <div className="flex justify-start flex-shrink-0 items-center mb-4 lg:mb-0"> {/* Logo */}
                        <img src="/pokedex.png" alt="Logo" className="h-8 mr-2" />
                    </div>
                    {/* Línks de redes para escritorio */}
                    <div className="hidden lg:flex justify-between space-x-4"> {/* Redes ocultas en móviles */}
                        <Link to="https://x.com/Pokemon" className="flex items-center">
                            <FaSquareXTwitter className="h-6 w-6" />
                        </Link>
                        <Link to="https://www.facebook.com/PokemonOficialLatAm/?brand_redir=230809307041021" className="flex items-center">
                            <FaFacebookSquare className="h-6 w-6" />
                        </Link>
                        <Link to="https://www.instagram.com/pokemon/" className="flex items-center">
                            <IoLogoInstagram className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
                {/* Línea blanca separadora */}
                <div className="bg-poke-gray h-1 w-full mt-4 mb-4" />
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0"> {/* Links adicionales */}
                    <Link to="" className="text-white hover:text-gray-400 transition duration-200 font-bold">
                        Ayuda
                    </Link>
                    <Link to="" className="text-white hover:text-gray-400 transition duration-200 font-bold">
                        Contacto
                    </Link>
                    <Link to="" className="text-white hover:text-gray-400 transition duration-200 font-bold">
                        Seguridad
                    </Link>
                    <Link to="" className="text-white hover:text-gray-400 transition duration-200 font-bold">
                        Acerca de PokeDex
                    </Link>
                </div>
                {/* Línea blanca separadora */}
                <div className="flex lg:hidden bg-MazeBarColor h-1 w-full mt-4 mb-4" />
                {/* Línks de redes para móviles */}
                <div className="flex lg:hidden justify-start space-x-2 mt-4">
                    <Link to="https://x.com/Pokemon" className="flex items-center">
                        <FaSquareXTwitter className="h-6 w-6" />
                    </Link>
                    <Link to="https://www.facebook.com/PokemonOficialLatAm/?brand_redir=230809307041021" className="flex items-center">
                        <FaFacebookSquare className="h-6 w-6" />
                    </Link>
                    <Link to="https://www.instagram.com/pokemon/" className="flex items-center">
                        <IoLogoInstagram className="h-6 w-6" />
                    </Link>
                </div>
                <div>
                    <p className="text-sm mt-4">
                        © 2024 PokeDex. Todos los derechos reservados. {/* Mensaje de derechos de autor */}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer // Exporta el componente Footer para su uso en otras partes de la aplicación.