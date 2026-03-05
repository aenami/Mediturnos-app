import express from 'express'
// Importamos el controlador de nuestro modelo
import { getAppointmentsDoctor, createAppointment, getAppointmentsUser } from '../controllers/appointment.controller.js';
const router = express.Router();

// Traer todos los doctores
router.get("/doctors/:id_doctor", getAppointmentsDoctor)

// Agendar una cita
router.post("/", createAppointment)

router.get("/user", getAppointmentsUser)

export default router