import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function MoviesByGenrePage() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br&with_genres=${id}`);
                const data = await response.json();
                setMovies(data.results);
                const genre = data.results[0]?.genre_ids?.includes(Number(id)) ? data.results[0].genres[0]?.name : '';
                setGenreName(genre);
            } catch (error) {
                console.error("Erro ao buscar filmes por gênero:", error);
            }
        };
        fetchMoviesByGenre();
    }, [id]);

    return (
        <div className="p-6 bg-black text-white min-h-screen">
            <h3 className="text-2xl font-semibold text-yellow-300 mb-4">Filmes do Gênero: {genreName}</h3>
            <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies.map(movie => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </section>
        </div>
    );
}
