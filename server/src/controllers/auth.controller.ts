// Importamos el modelo
import User from "../models/User.js"
import type { Request, Response} from 'express' // Importamos los tipos de datos para req/res
import { hashPassword } from "../services/passwordService.js" // Improtamos el servicio de password
import { generateToken } from "../services/tokensService.js"
import { parse } from "node:path"

export const createUser = async (req: Request, res: Response) => {
    // Extrameos la informacion del formulario
    const {nombre, apellidos, correo, tipo_documento, documento, password} = req.body

    try {
        //-------------- Validaciones previas a la insercion
        const validationInfo = await User.verifyCreateUser(documento, correo)

        if(validationInfo !== undefined) {
            return res.status(409).json({
                error: true,
                message: validationInfo
            })
        }

        //------------- Logica para la insercion del usuario
        //1. Hasheamos la contraseña
        const hashedPassword = await hashPassword(password);

        await User.createUser(nombre, apellidos, correo, tipo_documento, documento, hashedPassword)

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

export const loginUser = async (req: Request, res: Response) => {
    try {
        // Extraemos la informacion del formulario
        const {int_document, password} = req.body

        // Verificamos que el usuario exista en la db
        const userExists = await User.verifyUserExists(int_document)

        if(!userExists){
            return res.status(409).json({
                error: true,
                message: 'El documento ingresado no coincide con el de ningun usuario registrado'
            })
        }

        // Verificar la informacion ingresada por el usuario
        const validateData = await User.verifyLoginUser(int_document, password)

        if(!validateData) {
            return res.status(409).json({
                error: true,
                message: 'Contraseña ingresada incorrecta. Prueba con otra'
            })
        }

        // Luego de validar que si se ingreso la contraseña corecta, hacemos una consulta que traera el id del paciente el cual incluiremos en el body de nuestro token. Tambien informacion extra
        const pacienteData = await User.getIdUser(int_document)
        const token = generateToken(pacienteData.paciente_id)

        //-------Devolvemos la respuesta correcta al frontend con el token y la informacion del user logeado
        return res.status(200).json({
            error: false,
            message: 'Login exitoso..',
            token: token,
            user: {
                id: pacienteData.paciente_id,
                nombre: pacienteData.nombre_paciente,
            }

        })

    } catch (error) {
        console.log('Error al logear el usuario', error)
        return res.status(500).json({
            error: true,
            message: error
        })
    }
}