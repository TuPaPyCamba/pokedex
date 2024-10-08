// Componente Layout que define un contenedor principal para el contenido de la aplicación.
const Layout = ({children}) => {
    return (
        // Contenedor principal con estilos aplicados
        <main className="flex-grow w-full mt-40 mb-10 mx-auto md:w-11/12 2xl:w-7/12 p-12 lg:bg-poke-md-white md:bg-white rounded-3xl lg:shadow-2xl min-h-[80vh]">
            {children} {/* Renderiza los elementos hijos pasados al componente */}
        </main>
    )
}

export default Layout  // Exporta el componente Layout para su uso en otras partes de la aplicación.