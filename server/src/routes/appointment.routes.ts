import express from 'express'
// Importamos el controlador de nuestro modelo
import { getAppointmentsDoctor, createAppointment, getAppointmentsUser, deleteAppointment } from '../controllers/appointment.controller.js';

// Importamos nuestro middleware de autenticacion
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Traer todos los doctores
router.get("/doctors/:id_doctor", getAppointmentsDoctor)

// Agendar una cita
router.post("/", requireAuth, createAppointment) // Utilizamos el middleware en esta ruta

// Traer citas del usuario
router.get("/user", requireAuth, getAppointmentsUser) // Utilizamos el middleware en esta ruta 

// Eliminar cita
router.delete("/:id_appointment", requireAuth, deleteAppointment); // Quiero utilizar el middleware en esta pero da errror

export default router