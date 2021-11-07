import express from 'express'
import asyncHandler from 'express-async-handler'                            // asyncHandler est un middleware qui catch les erreurs, on peut donc omettre try-catch
import Product from '../models/productModel.js'

const router = express.Router()

// @desc      Obtient tous les produits en vente
// @route     GET /api/products
// @access    public
router.get('/', asyncHandler(async (req, res) => {                          // asyncHandler est un middleware qui catch les erreurs, on peut donc omettre try-catch
  const products = await Product.find({})                                   // Utilise la methode find() de l'obj Product construit par mongoose
  res.json(products)
}))


// @desc      Obtient un produit 
// @route     GET /api/products/:id
// @access    public
router.get('/:id', asyncHandler(async (req, res) => { 
  const product = await Product.findById(req.params.id)                     // Utilise la méthode findById() de l'obj Product construit par mongoose

  if (product) {
    res.json(product) 
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}))


export default router