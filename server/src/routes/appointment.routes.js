import express from 'express'
// Importamos el controlador de nuestro modelo
import { getAppointmentsDoctor, createAppointment, getAppointmentsUser, deleteAppointment } from '../controllers/appointment.controller.js';
const router = express.Router();

// Traer todos los doctores
router.get("/doctors/:id_doctor", getAppointmentsDoctor)

// Agendar una cita
router.post("/", createAppointment)

// Traer citas del usuario
router.get("/user", getAppointmentsUser)

// Eliminar cita
router.delete("/:id_appointment", deleteAppointment);

export default router