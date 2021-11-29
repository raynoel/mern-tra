import express from 'express'
const router = express.Router()
import { authUser, registerNewUser, getUserProfile, updateUserProfile, getUsers, deleteUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Routes
router.post('/login', authUser)
router.route('/').post(registerNewUser)
router.route('/').get(protect, admin, getUsers)
router.route('/:id').delete(protect, admin, deleteUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

export default router