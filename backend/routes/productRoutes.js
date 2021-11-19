import express from 'express'
import Product from '../models/productModel.js'
import { getProducts, getProductById } from '../controllers/productController.js'

const router = express.Router()

// Routes
router.route('/',).get(getProducts)
router.route('/:id').get(getProductById);


export default router