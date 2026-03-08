// -------Impotando modulos y librearias
import express from "express"
import cors from "cors"
import DoctorRouter from "./routes/doctor.routes.js"
import SpecialityRouter from "./routes/specialty.routes.js"
import AppointmentsRouter from "./routes/appointment.routes.js"
import AuthenticationRoter from "./routes/auth.rotues.js"

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
app.use('/doctors', DoctorRouter)
app.use('/specialities', SpecialityRouter)
app.use('/appointments', AppointmentsRouter)
app.use('/auth', AuthenticationRoter)

// ------ RUTA POR DEFAULT



export default app