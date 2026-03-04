// Importamos modelos necesarios
import Appointment from '../models/Appointment.js'

export const getAppointmentsDoctor = async (req, res) =>{
    // Extraemos el id que definimos en la ruta
    const { id_doctor } = req.params;

    try {
        const appointments = await Appointment.getAppointmentsDoctor(id_doctor) // Pasarle el id del doctor
        console.log(appointments)
        res.status(200).json(appointments)
    } catch (error) {
        console.log('Error obteniendo fechas: ', error)
        res.status(500).json({
            error: 'Error interno del servidor'
        })
    }

}
