import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function GenreListPage() {
    const [genres, setGenres] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`);
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error("Erro ao buscar gêneros:", error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <div className="p-6 bg-black text-white min-h-screen">
            <h2 className="text-4xl font-extrabold text-purple-400 mb-6">Gêneros</h2>
            <div className="flex flex-wrap gap-3 mb-8">
                {genres.map(genre => (
                    <Link 
                        key={genre.id} 
                        to={`/genre/${genre.id}`}
                        className={`py-2 px-4 rounded text-white font-semibold transition 
                            ${location.pathname === `/genre/${genre.id}` ? "bg-yellow-300 text-black" : "bg-purple-600 hover:bg-purple-700"}
                        `}
                    >
                        {genre.name}
                    </Link>
                ))}
            </div>
            <Outlet />
        </div>
    );
}
