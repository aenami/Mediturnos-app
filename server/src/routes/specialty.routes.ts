import express from 'express'
import { getSpecialities } from '../controllers/specialty.controller.js'

const router = express.Router();

// Traer todos los doctores
router.get("/", getSpecialities)

export default router