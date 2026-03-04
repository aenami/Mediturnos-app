import { Pool } from "pg"
import dotenv from "dotenv"

// Inicializando variables de entorno
dotenv.config();

let pool;

// Funcion que se ejecutara desde index.js al levantar el servidor
export const initializePool = async () => {
    // Creamos un pool para administrar las conexiones
    // Todavia no se ha realizado ninguna conexion directa a la bd
    pool = new Pool( {
        connectionString: process.env.DATABASE_URL
    } )
    

    // Verificamos la conexion a la bd conectandonos explicitamente a una conexion del pool
    try {
        const client = await pool.connect()
        console.log("Conexion realizada con exito")
        client.release();
    } catch (error) {
        // Terminamos el proceso y por ende el levantamiento del servidor
        console.error("Error al intentar crear una conexion: ", error.message)
        process.exit(1);
    }
    
};

export const getConnection = () => {
    if(!pool){
        throw new Error("El pool de conexiones no ha sido inicializado")
    }
    return pool
}