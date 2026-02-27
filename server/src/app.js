// -------Impotando modulos y librearias
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
const app = express()

// -------Importando rutas




// ------- Settings de nuestro backend
app.set('case sensitive Routing', true)
app.set('appName', 'Express app')
app.set('port', process.env.PORT) // -----TRAER EL PUERTO CON UNA VARIBALE DE ENTORNO



// ------- MIDDLEWARES ------
app.use(cors( {
    origin: "http://localhost:5173"
} ))
app.use(express.json())
app.use(express.urlencoded( {extended: false} ))




// ------- RUTAS CREADAS -----
app.get("/", (req, res) => {
    res.json( {message: "Api funcionando correctamente"} )
})


// ------ RUTA POR DEFAULT



export default app