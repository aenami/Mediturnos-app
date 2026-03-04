import { getConnection} from "../config/db.js"

const Specialty = {
    async getAll(){
        try {
            const query = 'SELECT * FROM Especialidad ORDER BY id_especialidad ASC'
            const pool = getConnection()


            const result = await pool.query(query)
            return result.rows
        } catch (error) {
            console.log('Error al traer todas las especialidades de la db: ', error)
        }
    },

}

export default Specialty