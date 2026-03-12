// Importamos nuestro modulo que manejara todas las operaciones referentes al token
import { tokenManager } from "../utils/tokenManager"

const API_URL = import.meta.env.VITE_API_URL;

type typesCredentials = {
    int_document: number;
    password: string;
}

type typesUserData = {
    nombre: string;
    apellidos: string;
    correo: string;
    tipo_documento: string; 
    documento: number;
    password: string;
}

export const authService = {
    
    async loginUser(credentials: typesCredentials) {
        try {

            //1. Hacemos la peticion a la API para poder logearnos
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            //2. Convertios la data de la respuesta de texto plano hacia objeto para poder trabajar con ella
            const data = await response.json();

            //3. Verificamos si la respuesta de backend fue negativa
            if(!response.ok){
                throw new Error(data.message || 'Errror al iniciar sesion')
            }

            //4. Guardamos la session en el navegador
            tokenManager.saveSession(data.token, data.user)

            //5. Devolvemos la respuesta al componente
            return data;
        } catch (error) {
            console.log('Hubo un error al intentar logear al usuario: ', error)
            throw error
        }
    },

    async registerUser(userData:typesUserData) {
        try {

            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al registrar usuario");
            }

            return data;

        } catch (error) {
            console.log('Hubo un error al intentar registrar al usuario: ', error)
            throw error;
        }
    },

    logout() {
        tokenManager.clearSession();
    }
}
