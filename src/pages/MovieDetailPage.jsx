import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdStar, MdStarBorder } from "react-icons/md";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const [movieRes, castRes, trailerRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
                ]);
                const movieData = await movieRes.json();
                setMovie(movieData);
                setCast((await castRes.json()).cast.slice(0, 5));
                const trailer = (await trailerRes.json()).results.find(video => video.type === "Trailer" && video.site === "YouTube");
                setTrailerKey(trailer ? trailer.key : null);
            } catch (error) {
                console.error("Erro ao buscar dados do filme:", error);
            }
        };
        fetchMovieData();
    }, [id]);

    const saveToLocalStorage = (key) => {
        const movies = JSON.parse(localStorage.getItem(key)) || [];
        if (!movies.find(f => f.id === movie.id)) {
            localStorage.setItem(key, JSON.stringify([...movies, movie]));
            alert(`Filme adicionado à lista de ${key === "filmesAssistidos" ? "Assistidos" : "Ver Depois"}!`);
        } else {
            alert("Este filme já está na lista.");
        }
    };

    const renderStars = () => (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => i < Math.floor((movie?.vote_average || 0) / 2) 
                ? <MdStar key={i} className="text-yellow-400" /> 
                : <MdStarBorder key={i} className="text-yellow-400" />)}
            <span className="ml-2 text-lg">{(movie?.vote_average / 2).toFixed(1)} / 5</span>
        </div>
    );

    if (!movie) return <p>Carregando...</p>;

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center text-white" 
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            
            <div className="relative max-w-4xl mx-auto p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg backdrop-blur-sm">
                {trailerKey && (
                    <iframe
                        width="100%" height="400" src={`https://www.youtube.com/embed/${trailerKey}`} 
                        title="Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen className="mb-8 rounded-lg shadow-lg"
                    ></iframe>
                )}

                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

                <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres?.map(g => (
                        <span key={g.id} className="bg-purple-600 text-white py-1 px-3 rounded-full text-sm">{g.name}</span>
                    ))}
                </div>

                <p className="text-lg mb-4">{movie.overview}</p>
                <div className="mb-4">
                    <strong className="text-lg">Avaliação:</strong>
                    {renderStars()}
                </div>

                <p className="mb-4"><strong className="text-lg">Data de Lançamento:</strong> {movie.release_date}</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Elenco Principal</h2>
                <ul className="grid grid-cols-2 gap-4">
                    {cast.map(actor => (
                        <li key={actor.cast_id} className="bg-gray-700 p-3 rounded-lg">
                            <p className="font-semibold">{actor.name}</p>
                            <p className="text-sm text-gray-300">como {actor.character}</p>
                        </li>
                    ))}
                </ul>

                <div className="flex mt-8 space-x-4">
                    <button onClick={() => saveToLocalStorage("filmesAssistidos")} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                        Marcar como Assistido
                    </button>
                    <button onClick={() => saveToLocalStorage("filmesVerDepois")} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                        Adicionar para Ver Depois
                    </button>
                </div>
            </div>
        </div>
    );
}
