import { useEffect, useState, useRef } from "react";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);

    const popularesRef = useRef(null);
    const trendingRef = useRef(null);
    const upcomingRef = useRef(null);

    const fetchMovies = async () => {
        try {
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
            ]);

            const popularData = await respostaPopulares.json();
            const trendingData = await respostaTrending.json();
            const upcomingData = await respostaUpcoming.json();

            setFilmesPopulares(popularData.results);
            setFilmesTrending(trendingData.results);
            setFilmesUpcoming(upcomingData.results);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -500, behavior: "smooth" });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 500, behavior: "smooth" });
    };

    return (
        <div className="space-y-8 p-4 bg-black text-white">
            <CardContainer titulo="Filmes Populares">
                <div className="relative flex items-center">
                    <button 
                        onClick={() => scrollLeft(popularesRef)}
                        className="absolute left-4 z-10 bg-black bg-opacity-50 rounded-full p-2 transform -translate-y-1/2 top-1/2"
                    >
                        <MdChevronLeft size={40} className="text-white" />
                    </button>
                    <div ref={popularesRef} className="flex overflow-hidden space-x-4 w-full px-12">
                        {filmesPopulares.map(filme => (
                            <MovieCard 
                                key={filme.id} 
                                id={filme.id}
                                title={filme.title}
                                poster_path={filme.poster_path}
                                vote_average={filme.vote_average}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={() => scrollRight(popularesRef)}
                        className="absolute right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 transform -translate-y-1/2 top-1/2"
                    >
                        <MdChevronRight size={40} className="text-white" />
                    </button>
                </div>
            </CardContainer>

            <CardContainer titulo="Filmes em Tendência">
                <div className="relative flex items-center">
                    <button 
                        onClick={() => scrollLeft(trendingRef)}
                        className="absolute left-4 z-10 bg-black bg-opacity-50 rounded-full p-2 transform -translate-y-1/2 top-1/2"
                    >
                        <MdChevronLeft size={40} className="text-white" />
                    </button>
                    <div ref={trendingRef} className="flex overflow-hidden space-x-4 w-full px-12">
                        {filmesTrending.map(filme => (
                            <MovieCard 
                                key={filme.id} 
                                id={filme.id}
                                title={filme.title}
                                poster_path={filme.poster_path}
                                vote_average={filme.vote_average}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={() => scrollRight(trendingRef)}
                        className="absolute right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 transform -translate-y-1/2 top-1/2"
                    >
                        <MdChevronRight size={40} className="text-white" />
                    </button>
                </div>
            </CardContainer>

            <CardContainer titulo="Próximos Lançamentos">
                <div className="relative flex items-center">
                    <button 
                        onClick={() => scrollLeft(upcomingRef)}
                        className="absolute left-4 z-10 bg-black bg-opacity-50 rounded-full p-2 transform -translate-y-1/2 top-1/2"
                    >
                        <MdChevronLeft size={40} className="text-white" />
                    </button>
                    <div ref={upcomingRef} className="flex overflow-hidden space-x-4 w-full px-12">
                        {filmesUpcoming.map(filme => (
                            <MovieCard 
                                key={filme.id} 
                                id={filme.id}
                                title={filme.title}
                                poster_path={filme.poster_path}
                                vote_average={filme.vote_average}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={() => scrollRight(upcomingRef)}
                        className="absolute right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 transform -translate-y-1/2 top-1/2"
                    >
                        <MdChevronRight size={40} className="text-white" />
                    </button>
                </div>
            </CardContainer>
        </div>
    );
}
