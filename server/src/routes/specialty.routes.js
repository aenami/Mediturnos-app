import express from 'express'
import Specialty from '../models/Specialty.js'

const router = express.Router();

// Traer todos los doctores
router.get("/", async (req, res) => {
    try {
        const Specialities = await Specialty.getAll()
        res.status(200).json(Specialities)
    } catch (error) {
        console.log('Error obteniendo especialidades: ', error)
        res.status(500).json({
            error: 'Error interno del servidor'
        })
    }
})

export default router