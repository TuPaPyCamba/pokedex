import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaFacebookSquare } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io5"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-poke-gray w-full text-white py-10">
            <div className="container max-w-[1200px] mx-auto flex flex-col justify-between px-4">
                <div className="flex flex-col lg:flex-row lg:justify-between sm:flex-col">
                    <div className="flex justify-start flex-shrink-0 items-center mb-4 lg:mb-0">
                        <img src="/pokedex.png" alt="Logo" className="h-8 mr-2" />
                    </div>
                    {/* Línks de redes para escritorio */}
                    <div className="hidden lg:flex justify-between space-x-4"> {/* Oculto en móviles */}
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
                {/* Línea blanca */}
                <div className="bg-poke-gray h-1 w-full mt-4 mb-4" />
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
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
                {/* Línea blanca */}
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
                        © 2024 PokeDex. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;