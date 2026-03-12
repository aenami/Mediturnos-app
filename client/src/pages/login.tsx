import { useEffect, useState, type ChangeEvent, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { tokenManager } from "@/utils/tokenManager";

function Login() {
    // Verificacion para ver si el usuario ya tiene un token o no
    const navigate = useNavigate();

    useEffect(() => {

        const token = tokenManager.getToken();

        if (token) {
            navigate("/workspace");
        }

    }, []);

    // Estados necesarios
    const [documento, setDocumento] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit:SubmitEventHandler = async (e) => {

        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const int_document = parseInt(documento)
            await authService.loginUser({
                int_document,
                password
            });

            navigate("/workspace");

        } catch (err: unknown) {
            // Verifiamos que la variable err sea una instancia de Error
            if(err instanceof Error){
                setError(err.message);
            }else{
                console.log('Ocurrio un error inesperado al manejar el evento submit')
            }
        } finally {
            setLoading(false);
        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Iniciar sesión
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>

                        <input
                            type="number"
                            value={documento}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDocumento(e.target.value)}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </button>

                </form>

                <p className="text-sm text-center mt-4">
                    ¿No tienes cuenta?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Crear cuenta
                    </a>
                </p>

            </div>

        </div>

    );

}

export default Login;

