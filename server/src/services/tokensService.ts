import jwt from "jsonwebtoken"
import dotenv from 'dotenv'


export const generateToken = (id_paciente: number) => {
    // Payload con la informacion del usuario que almacenara el tokken
    const payload = {
        id: id_paciente,
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET!, // Le dicemos a typescript que confie que esto nunca sera nulo
        { expiresIn: '1h' }
    )
    return token
}