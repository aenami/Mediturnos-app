import { getConnection} from "../config/db.js"

const Appointment = {
    async getAppointmentsDoctor(id_doctor){
        try {
            const query = `SELECT Cita.fecha_cita FROM Cita INNER JOIN Doctor ON Cita.id_doctor_cita = Doctor.id_doctor WHERE Cita.id_doctor_cita = $1`

            const values = [id_doctor]
            const pool = getConnection()


            const result = await pool.query(query, values)
            return result.rows
        } catch (error) {
            console.log('Error al traer las fechas de la db: ', error)
        }
    },

}

export default Appointment