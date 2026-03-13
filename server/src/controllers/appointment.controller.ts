// Importamos modelos necesarios
import { parse } from 'node:path';
import Appointment from '../models/Appointment.js'
import type { Request, Response } from 'express'
import { RequestHandler } from 'express';

interface appointmentsDoctorParams {
    id_doctor: string;
}

type deleteAppointmentParam = {
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
    console.log('hola')
    const { id_doctor, fecha, hora, motivo } = req.body;

    // Traemos el id del usuario gracias al middleware de autenticacion
    const { id } = req.user!

    // Validación básica
    if (!id_doctor || !fecha || !hora || !motivo) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }

    try {
        Appointment.createAppointment(motivo, fecha, hora, id, id_doctor);

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

export const getAppointmentsUser: RequestHandler = async (req, res) => {
    const { id } = req.user! // Le aseguramos a ts que req.user no sera undefined (Ya que sabemos que paso por el middleware al haber llegado a este controlador)
    try {
        const appointments = await Appointment.getAppointmentsUser(id);

        res.status(200).json(appointments);

    } catch (error) {
        console.error("Error obteniendo citas del usuario:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

export const deleteAppointment:RequestHandler<deleteAppointmentParam> = async (req, res) => {
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


