import express from 'express'
// Importamos el controlador de nuestro modelo
import { getAppointmentsDoctor } from '../controllers/appointment.controller.js';
const router = express.Router();

// Traer todos los doctores
router.get("/doctors/:id_doctor", getAppointmentsDoctor)

export default router