import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MovieListPage() {
    const [search, setSearch] = useState("");
    const [filmes, setFilmes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMovies = async (pageNumber) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br&page=${pageNumber}`);
            const data = await response.json();
            setFilmes(prevFilmes => [...prevFilmes, ...data.results]);
            setHasMore(data.page < data.total_pages);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 && !isLoading && hasMore && search === "") {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore, search]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filmesFiltrados = search === "" ? filmes : filmes.filter(filme => filme.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-6 bg-black text-white min-h-screen">
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Veja a lista de filmes completa</h2>

            <div className="mb-8 flex justify-center">
                <input
                    className="w-full max-w-lg p-3 rounded-lg text-black focus:outline-none"
                    type="text"
                    placeholder="Buscar filme..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {isLoading && page === 1 ? (
                    <p className="text-center text-lg col-span-full">Carregando...</p>
                ) : filmesFiltrados.length > 0 ? (
                    filmesFiltrados.map(filme => (
                        <MovieCard key={filme.id} {...filme} />
                    ))
                ) : (
                    <p className="text-center text-lg col-span-full">Filme não encontrado</p>
                )}
            </section>

            {isLoading && page > 1 && search === "" && (
                <p className="text-center text-lg mt-4">Carregando mais filmes...</p>
            )}
        </div>
    );
}
