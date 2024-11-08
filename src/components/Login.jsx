export default function Login({ isLogged, handleLogin }) {
    return (
        <div className="flex items-center gap-4">
            {isLogged && <p className="text-sm font-semibold text-yellow-300">Olá, usuário</p>}
            <button
                onClick={handleLogin}
                className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out shadow-md 
                            ${isLogged ? "bg-gray-200 text-purple-800 hover:bg-gray-300" 
                                       : "bg-yellow-500 text-purple-900 hover:bg-yellow-600"}`}
            >
                {isLogged ? "Logout" : "Login"}
            </button>
        </div>
    );
}
