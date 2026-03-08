import Specialty from '../models/Specialty.js'
import type {Request, Response } from 'express'

export const getSpecialities = async (req: Request, res: Response) =>{
    try {
        const Specialities = await Specialty.getAll()
        res.status(200).json(Specialities)
    } catch (error) {
        console.log('Error obteniendo especialidades: ', error)
        res.status(500).json({
            error: 'Error interno del servidor'
        })
    
    }

}