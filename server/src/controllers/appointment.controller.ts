// Importamos modelos necesarios
import Appointment from '../models/Appointment.js'
import type { Request, Response } from 'express'

interface appointmentsDoctorParams {
    id_doctor: string;
}

interface deleteAppointmentParam {
    id_appointment: string;
}

export const getAppointmentsDoctor = async (req: Request<appointmentsDoctorParams>, res: Response) =>{
    // Extraemos el id que definimos en la ruta
    const { id_doctor } = req.params;
    const int_id_doctor = parseInt(id_doctor)

    try {
        const appointments = await Appointment.getAppointmentsDoctor(int_id_doctor) // Pasarle el id del doctor
        res.status(200).json(appointments)
    } catch (error) {
        console.log('Error obteniendo fechas: ', error)
        res.status(500).json({
            error: 'Error interno del servidor'
        })
    }

}

export const createAppointment = async (req: Request, res: Response) => {
    const { id_doctor, fecha, hora, motivo } = req.body;

    // Validación básica
    if (!id_doctor || !fecha || !hora || !motivo) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }
    // CONVERTIR EL ID DEL USUARIO A NUMBER
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

export const getAppointmentsUser = async (req: Request, res: Response) => {
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

export const deleteAppointment = async (req: Request<deleteAppointmentParam>, res: Response) => {
    const { id_appointment } = req.params;
    const int_id_appointment = parseInt(id_appointment);

    try {
        Appointment.deleteAppointment(int_id_appointment);

        res.status(200).json({
            message: "Cita cancelada correctamente"
        });

    } catch (error) {
        console.error("Error cancelando cita:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};


