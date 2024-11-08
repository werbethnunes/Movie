import { Link } from "react-router-dom";
import { MdStar, MdStarBorder } from "react-icons/md";

export default function MovieCard({ id, title, poster_path, vote_average }) {
    const posterUrl = poster_path 
        ? `https://image.tmdb.org/t/p/w342${poster_path}` 
        : "https://via.placeholder.com/130x200?text=Sem+Imagem"; 

    const renderStars = () => {
        const rating = Math.floor(vote_average / 2);
        return (
            <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                    i < rating ? 
                        <MdStar key={i} className="text-yellow-400" /> : 
                        <MdStarBorder key={i} className="text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-300">{(vote_average / 2).toFixed(1)} / 5</span>
            </div>
        );
    };

    return (
        <div className="w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-shrink-0 m-2">
            <img 
                src={posterUrl} 
                alt={title} 
                className="w-full h-72 object-cover"
            />
            <div className="p-3">
                <h3 className="text-sm font-bold text-white truncate text-center">{title}</h3>
                <div className="mt-2">{renderStars()}</div>
                <Link 
                    className="block mt-3 py-1 px-4 transition ease-in-out duration-300 bg-purple-800 hover:bg-white hover:text-purple-800 text-white text-center rounded-lg" 
                    to={`/movies/${id}`}
                >
                    Ver detalhes
                </Link>
            </div>
        </div>
    );
}
