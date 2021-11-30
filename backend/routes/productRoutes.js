import express from 'express'
import Product from '../models/productModel.js'
import { getProducts, getProductById, deleteProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Routes
router.route('/').get(getProducts)
router
  .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)


export default router