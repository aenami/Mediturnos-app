import { getConnection } from '../config/db.js'

interface typeUser {
    createUser: (nombre: string, apellidos: string, 
        correo: string, tipo_documento: string, 
        documento: number) => Promise<void>;
    // Nuestra funcion devuelve una promesa, que cuando se resuelve devuelve un string o nada
    verifyUser: (documento: number, correo: string) => Promise<string | undefined>;
}

const User: typeUser = {
    async createUser(nombre, apellidos, correo, tipo_documento, documento) {
        try {
            // Creando la consulta
            const query: string = `INSERT INTO Paciente (nombre_paciente, apellidos_paciente, correo_paciente, tipo_documento_paciente, documento_paciente) VALUES ($1, $2, $3, $4, $5);`

            // Defininimos que los valores de la consulta estaran almacenados en una lista de string o numbers
            const values: (string | number)[] = [nombre, apellidos, correo, tipo_documento, documento]

            // Instacimos conexion a la db
            const pool = getConnection()

            await pool.query(query, values)

        } catch (error) {
            // Enviamos error
            console.log("Error al insertar consulta de creacion de usuario en la db")
            throw(error)
        }
        
    },

    async verifyUser(documento, correo) {
        try {
            // Crando consulta
            const query = `SELECT documento_paciente, correo_paciente FROM Paciente WHERE documento_paciente = $1 OR correo_paciente = $2`

            const values: (string | number)[] = [documento, correo]

            // Creando una conexion
            const connection = getConnection()

            // Realizando consulta
            const result = await connection.query(query, values)

            // Verificamos si hubo algun dato duplicado
            if(result.rows.length > 0){
                const duplicatedRegister = result.rows[0]

                if(duplicatedRegister.documento_paciente == documento){
                    return 'El documento ingresado ya esta registrado. Prueba con otro'
                }

                if(duplicatedRegister.correo_paciente == documento){
                    return 'El correo ingresado ya esta registrado. Prueba con otro'
                }
            }
        } catch (error) {
            console.log('Error al verificar el documento/correo que el usuario ingreso')
            throw error
        }
    }

}

export default User