import { useEffect, useState } from 'react';
import MovieCard from "../components/MovieCard";

export default function FilmesAssistidos() {
    const [filmesAssistidos, setFilmesAssistidos] = useState([]);

    useEffect(() => {
        const filmesSalvos = JSON.parse(localStorage.getItem("filmesAssistidos")) || [];
        setFilmesAssistidos(filmesSalvos);
    }, []);

    return (
        <div className="p-6 bg-black text-white min-h-screen">
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Filmes Assistidos</h2>
            <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filmesAssistidos.length > 0 ? (
                    filmesAssistidos.map(filme => (
                        <MovieCard key={filme.id} {...filme} />
                    ))
                ) : (
                    <p className="text-center text-lg col-span-full">Nenhum filme assistido ainda.</p>
                )}
            </section>
        </div>
    );
}
