import express from 'express'
import Product from '../models/productModel.js'
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Routes
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)


export default router