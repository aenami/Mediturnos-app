import express from 'express'
// Importamos metodos de nuestro controlador
import { createUser } from '../controllers/user.controller.ts'
const router = express.Router()

// Rutas de register
router.post('/register', createUser)

// Ruta de login

export default router


