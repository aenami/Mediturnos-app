import { getConnection} from "../config/db.js"

const Appointment = {
	async createAppointment(motivo_cita, fecha_cita, hora_cita, id_doctor_cita, id_paciente_cita) {
		try {
			const query = `
				INSERT INTO Cita 
				(motivo_cita, estado_cita, fecha_cita, hora_cita, id_paciente_cita, id_doctor_cita)
				VALUES ($1, $2, $3, $4, $5, $6)
			`;

			const values = [motivo_cita, 'Agendada', fecha_cita, hora_cita, id_paciente_cita , id_doctor_cita];

			const pool = getConnection();

			await pool.query(query, values);

		} catch (error) {
			console.log("Error al insertar cita:", error);
			throw error;
		}
	}
};

export default Appointment