// Importamos modelos necesarios
import Doctor from '../models/Doctor.js'
import type { Request, Response } from 'express'

interface spectialtyParams {
    id_specialty: string
}

export const getDoctorsBySpecialty = async (req: Request<spectialtyParams>, res: Response) =>{
    // Extraemos el id que definimos en la ruta
    const { id_specialty } = req.params;
    const int_id_specialty = parseInt(id_specialty,10)

    try {
        const doctors = await Doctor.getDoctorsSpecialities(int_id_specialty) // Pasarle el id de la especialidad
        res.status(200).json(doctors)
    } catch (error) {
        console.log('Error obteniendo doctores: ', error)
        res.status(500).json({
            error: 'Error interno del servidor'
        })
    }

}
