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

export const createAppointment = async (req, res) => {
    const { id_doctor, fecha, hora, motivo } = req.body;

    // Validación básica
    if (!id_doctor || !fecha || !hora || !motivo) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }

    try {
        // Simulamos un paciente colocandole el id 1
        await Appointment.createAppointment(motivo, fecha, hora, 1, id_doctor);

        res.status(201).json({
            message: "Cita creada correctamente"
        });

    } catch (error) {
        console.error("Error creando cita:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

export const getAppointmentsUser = async (req, res) => {
    const id_user = 1

    try {
        const appointments = await Appointment.getAppointmentsUser(id_user);

        res.status(200).json(appointments);

    } catch (error) {
        console.error("Error obteniendo citas del usuario:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};


