import { getConnection} from "../config/db.js"

interface appointmentsDate {
	fecha_cita: string;
	hora_cita: string;
}

interface appointmentUser {
	id_cita: number;
	fecha_cita: Date;
	hora_cita: Date;
	nombre_doctor: string;
	apellidos_doctor: string;
	nombre_especialidad: string;
}


interface typeAppointment {
	getAppointmentsDoctor: (id_doctor: number) => Promise<appointmentsDate[] | undefined>;
	createAppointment: (motivo_cita: string, fecha_cita: Date, 
		hora_cita: Date, id_paciente_cita: number, 
		id_doctor_cita: number) => void;
	getAppointmentsUser: (id_user: number) => Promise<appointmentUser[] | undefined>;
	deleteAppointment: (id_appointment: number) => void;
}

const Appointment: typeAppointment = {
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

			const result = await pool.query<appointmentsDate>(query, values);
			return result.rows;
		} catch (error) {
			console.log("Error al traer citas de la db: ", error);
			throw error;
		}
	},
	
	async createAppointment(motivo_cita, fecha_cita, hora_cita, id_paciente_cita, id_doctor_cita ) {
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
					Cita.id_cita,
					Cita.fecha_cita AS fecha,
					Cita.hora_cita AS hora,
					Doctor.nombre_doctor,
					Doctor.apellidos_doctor,
					Especialidad.nombre_especialidad
				FROM Cita
				LEFT JOIN Doctor 
					ON Cita.id_doctor_cita = Doctor.id_doctor
				LEFT JOIN Especialidad 
					ON Doctor.id_especialidad_doctor = Especialidad.id_especialidad
				WHERE Cita.id_paciente_cita = $1
				AND Cita.fecha_cita >= CURRENT_DATE
				ORDER BY Cita.fecha_cita ASC, Cita.hora_cita ASC
			`;

			const values = [id_user];
			const pool = getConnection();

			const result = await pool.query<appointmentUser>(query, values);

			return result.rows;

		} catch (error) {
			console.log("Error al traer citas del usuario:", error);
			throw error;
		}
	},

	async deleteAppointment(id_appointment) {
		try {
			const query = `
				DELETE FROM Cita
				WHERE id_cita = $1
			`;

			const pool = getConnection();
			await pool.query(query, [id_appointment]);

		} catch (error) {
			console.log("Error eliminando cita:", error);
			throw error;
		}
	}

};

export default Appointment