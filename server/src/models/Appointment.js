import { getConnection} from "../config/db.js"

const Appointment = {
	async getAppointmentsDoctor(id_doctor) {
		try {
			const query = `
                SELECT 
                    TO_CHAR(Cita.fecha_cita, 'YYYY-MM-DD') AS fecha,
                    TO_CHAR(Cita.hora_cita, 'HH24:MI') AS hora
                FROM Cita
                WHERE Cita.id_doctor_cita = $1
                `;

			const values = [id_doctor];
			const pool = getConnection();

			const result = await pool.query(query, values);
			return result.rows;
		} catch (error) {
			console.log("Error al traer citas de la db: ", error);
			throw error;
		}
	},
};

export default Appointment