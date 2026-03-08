// Importamos el modelo
import User from "../models/User.js"
import type { Request, Response} from 'express' // Importamos los tipos de datos para req/res

export const createUser = async (req: Request, res: Response) => {
    // Extrameos la informacion del formulario
    const [nombre, apellidos, correo, tipo_documento, documento] = req.body

    try {
        //-------------- Validaciones previas a la insercion
        const validationInfo = await User.verifyUser(documento, correo)

        if(validationInfo !== undefined) {
            return res.status(409).json({
                error: true,
                message: validationInfo
            })
        }

        //------------- Logica para la insercion del usuario
        await User.createUser(nombre, apellidos, correo, tipo_documento, documento)

        res.status(201).json({
            error: false,
            message: 'Usuario creado con exito'
        })
        
    } catch (error) {
        // Devolvemos la respuesta del error de nuestro modelo al frontend
        console.log('Error al crear el usuario: ', error)
        res.status(500).json({
            error: true,
            message: error
        })
    }
    
    

}