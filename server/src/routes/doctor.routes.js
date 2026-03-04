import express from 'express'
// Importamos el controlador de nuestro modelo
import { getDoctorsBySpecialty } from "../controllers/doctor.controller.js"
const router = express.Router();

// Traer todos los doctores
router.get("/specialities/:id_specialty", getDoctorsBySpecialty)

export default router