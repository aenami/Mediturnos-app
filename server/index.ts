import app from './src/app.ts'
import dotenv from 'dotenv'
import { initializePool } from './src/config/db.ts'

dotenv.config() // Inicializamos variables de entorno en este archivo

const PORT = process.env.PORT;

// Funcion principal
const startServer = async () => {
    try {
        await initializePool()

        app.listen(PORT, () => {
            console.log(`Servidor escuchando por peticiones en el puerto ${PORT}`)
        })
    } catch (error) {
        console.log('Ocurrio un error al intentar levantar el servidor: ', error)
    }
}

startServer()