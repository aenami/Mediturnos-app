import { getConnection} from "../config/db.js"

// Creando la interfaces
interface doctorNames {
    id_doctor: number;
    nombre_doctor: string;
}

interface doctorSpecialities {
    id_doctor: number;
    nombre_doctor: string;
    apellidos_doctor: string;
}

interface typeDoctor {
    getNames: () => Promise<doctorNames[] | undefined>;
    getDoctorsSpecialities: (id_specialty: number) => Promise<doctorSpecialities[] | undefined>;
}

// ---------MODELO
const Doctor: typeDoctor = {
    async getNames(){
         try {
            const query = 'SELECT id_doctor, nombre_doctor FROM Doctor ORDER BY id_doctor ASC'
            const pool = getConnection()


            const result = await pool.query<doctorNames>(query)
            return result.rows
        } catch (error) {
            console.log('Error al traer todos los doctores de la db: ', error)
        }
    },

    async getDoctorsSpecialities(id_specialty){
        try {
            // Creamos la consulta
            const query = `SELECT Doctor.id_doctor, Doctor.nombre_doctor, Doctor.apellidos_doctor FROM Doctor INNER JOIN Especialidad ON Doctor.id_especialidad_doctor = Especialidad.id_especialidad WHERE DOCTOR.id_especialidad_doctor = $1 ORDER BY Doctor.id_doctor ASC`

            // Definimos los valores que necesitara la consulta (Pide un array el modulo pg)
            const values = [id_specialty];

            const pool = getConnection()

            const result = await pool.query<doctorSpecialities>(query, values)
            return result.rows
        } catch (error) {
            console.log('Error al traer todos los doctores relacionados con la especialidad elegida de la db: ', error)
        }
    },

}

export default Doctor