import express from 'express'
// Importamos metodos de nuestro controlador
import { createUser, loginUser } from '../controllers/auth.controller.js';
const router = express.Router()

// Rutas de register
router.post('/register', createUser)

// Ruta de login
router.post('/login', loginUser)

export default router


