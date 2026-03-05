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
	},

	async getAppointmentsUser(id_user) {
    try {
        const query = `
            SELECT 
                Cita.fecha_cita AS fecha,
                Cita.hora_cita AS hora,
                Doctor.nombre_doctor,
                Doctor.apellidos_doctor,
                Especialidad.nombre_especialidad
            FROM Cita
            INNER JOIN Doctor 
                ON Cita.id_doctor_cita = Doctor.id_doctor
            INNER JOIN Especialidad 
                ON Doctor.id_especialidad_doctor = Especialidad.id_especialidad
            WHERE Cita.id_paciente_cita = $1
            AND Cita.fecha_cita >= CURRENT_DATE
            ORDER BY Cita.fecha_cita ASC, Cita.hora_cita ASC
        `;

        const values = [id_user];
        const pool = getConnection();

        const result = await pool.query(query, values);

        return result.rows;

    } catch (error) {
        console.log("Error al traer citas del usuario:", error);
        throw error;
    }
}

};

export default Appointment