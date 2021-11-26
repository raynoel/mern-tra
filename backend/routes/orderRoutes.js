import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'


// Routes
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(getOrderById);



export default router