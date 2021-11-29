import express from 'express'
const router = express.Router()
import { authUser, registerNewUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Routes
router.post('/login', authUser)
router
  .route('/')
    .post(registerNewUser)
    .get(protect, admin, getUsers)
router
  .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
router
  .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router