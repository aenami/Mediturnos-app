import { getConnection } from '../config/db.js'
import { compareHash } from '../services/passwordService.js';

interface typeUser {
    createUser: (nombre: string, apellidos: string, 
        correo: string, tipo_documento: string, 
        documento: number, hashedPassword: string) => Promise<void>;
    // Nuestra funcion devuelve una promesa, que cuando se resuelve devuelve un string o nada
    verifyCreateUser: (documento: number, correo: string) => Promise<string | undefined>;
    verifyUserExists: (documento: number) => Promise<true | false>;
    verifyLoginUser: (documento: number, contraseña: string) => Promise<true | false>;
}

const User: typeUser = {
    async createUser(nombre, apellidos, correo, tipo_documento, documento, hashedPassword) {
        try {
            // Creando la consulta
            const query: string = `INSERT INTO Paciente (nombre_paciente, apellidos_paciente, correo_paciente, tipo_documento_paciente, documento_paciente, contraseña_paciente) VALUES ($1, $2, $3, $4, $5, $6);`

            // Defininimos que los valores de la consulta estaran almacenados en una lista de string o numbers
            const values: (string | number)[] = [nombre, apellidos, correo, tipo_documento, documento, hashedPassword]

            // Instacimos conexion a la db
            const pool = getConnection()

            await pool.query(query, values)

        } catch (error) {
            // Enviamos error
            console.log("Error al insertar consulta de creacion de usuario en la db")
            throw(error)
        }
        
    },

    async verifyCreateUser(documento, correo) {
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
    },

    async verifyUserExists(documento) {
        // Funcion que verificara si existe un usuario con ese documento registrado
        try {
            const query = `SELECT paciente_id, nombre_paciente FROM Paciente WHERE documento_paciente = $1`

            const values = [documento]

            const connection = getConnection()

            const result = await connection.query(query, values)
            // Verificamos si hubo coincidencias y la db devolvio algo
            if(result.rows.length > 0){
                return true
            }
            return false

        } catch (error) {
            console.log('Hubo un error al consultar el documento ingresado en la db')
            throw error
        }
    },

    async verifyLoginUser(documento, contraseña) {
        // Funcion que se encarga de verificar que la contraseña ingresada coincida con la que se tiene almacenada
        try {
            // Consulta a la db
            const query = `SELECT contraseña_paciente FROM Paciente WHERE documento_paciente = $1`
            const values = [documento]

            const connection = getConnection()
            const result = await connection.query(query, values)

            const isMatch = await compareHash(contraseña, result.rows[0]) 

            if(isMatch){
                return true
            }
            return false
        } catch (error) {
            console.log('Error al verificar el documento / contraseña ingresado')
            throw error
        }
    },



}

export default User