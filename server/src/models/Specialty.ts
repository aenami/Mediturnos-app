import { getConnection} from "../config/db.js"

interface specialtyCol {
    id_especialidad: number;
    nombre_especialidad: string;
    descripcion_especialidad: string;
}


interface typeSpecialty {
    getAll: () => Promise<specialtyCol[] | undefined>;
}

const Specialty: typeSpecialty = {
    async getAll(){
        try {
            const query = 'SELECT * FROM Especialidad ORDER BY id_especialidad ASC'
            const pool = getConnection()


            const result = await pool.query<specialtyCol>(query)
            return result.rows
        } catch (error) {
            console.log('Error al traer todas las especialidades de la db: ', error)
        }
    },

}

export default Specialty