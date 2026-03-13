// Requerimos el modulo de jwt
import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction} from 'express'

// Estructura que sabemos siempre tendra nuestro payload
interface typePayload {
    id_user: number;
}

// -------- Este middleware se encargara de verficar que el usuario que esta realizando la peticon tenga un tokken valido -------------
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        //1. Verificamos que dentro del encabezado de la request del usuario haya una autorizacion (token)
        const authHeader = req.headers.authorization;

        if (!authHeader){
            return res.status(401).json({
                message: 'Token no proporcionado'
            })
        }

        //2. Verificamos que el formato esperado del token sea el correcto
        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: 'Token INVALIDO'
            })
        }
        
        //3. Decodificamos el token para verificar su firma. Si esto falla, el try-catch atrapa el error
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as typePayload; // Le decimos a ts que esto devolvera un objeto con mi estructura
        req.user = payload; // Agregamos el payloud a una propiedad user que creamos dentro de la request

        next();

    } catch (error) {
        // Como esto es un middleware, no lo precede un controller y por lo tanto tenemos que devolverle una respuesta al cliente aqui mismo
        console.log('Error al verificar la validez del token')
        return res.status(401).json({
            message: "Token invalido o expirado"
        })
    }
}