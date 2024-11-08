import { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";

export default function Header() {
    const [isLogged, setIsLogged] = useState(false);

    const handleLogin = () => {
        setIsLogged(!isLogged);
    };

    return (
        <header className="bg-purple-800 flex text-white justify-between items-center p-4 shadow-lg">
            <h1 className="text-3xl font-extrabold tracking-wide text-cyan-400 drop-shadow-lg">
                Portal Filmes
            </h1>
            <nav>
                <ul className="flex gap-6 text-lg font-medium">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300" : "hover:text-yellow-300"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/movies"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300" : "hover:text-yellow-300"
                            }
                        >
                            Filmes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/genre"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300" : "hover:text-yellow-300"
                            }
                        >
                            Gêneros
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/filmes-assistidos"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300" : "hover:text-yellow-300"
                            }
                        >
                            Assistidos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ver-depois"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300" : "hover:text-yellow-300"
                            }
                        >
                            Ver Depois
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contato"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-300" : "hover:text-yellow-300"
                            }
                        >
                            Contato
                        </NavLink>
                    </li>
                    {isLogged && (
                        <li>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    isActive ? "text-yellow-300" : "hover:text-yellow-300"
                                }
                            >
                                Configurações
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
            <Login isLogged={isLogged} handleLogin={handleLogin} />
        </header>
    );
}
