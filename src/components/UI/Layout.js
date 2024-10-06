const Layout = ({children}) => {
    return (
            <main className="flex-grow w-full mt-36 mb-10 mx-auto md:w-11/12 2xl:w-7/12 p-12 lg:bg-poke-md-white md:bg-white rounded-3xl lg:shadow-2xl">
                {children}
            </main>
    )
}

export default Layout