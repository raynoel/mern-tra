import express from 'express'
const router = express.Router()
import { authUser } from '../controllers/userController.js'

// Routes
router.post('/login', authUser)


export default router