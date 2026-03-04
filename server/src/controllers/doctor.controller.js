// Importamos modelos necesarios
import Doctor from '../models/Doctor.js'

export const getDoctorsBySpecialty = async (req, res) =>{
    // Extraemos el id que definimos en la ruta
    const { id_specialty } = req.params;

    try {
        const doctors = await Doctor.getDoctorsSpecialities(id_specialty) // Pasarle el id de la especialidad
        res.status(200).json(doctors)
    } catch (error) {
        console.log('Error obteniendo doctores: ', error)
        res.status(500).json({
            error: 'Error interno del servidor'
        })
    }

}
