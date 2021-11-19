// Les Controllers sont appelés par les productRoutes.js et implémentent les fonctionnalitées
import asyncHandler from 'express-async-handler';                     // Gère les erreurs async sans bloc try-catch
import Product from '../models/productModel.js'

// @desc      Obtient tous les produits en vente
// @route     GET /api/products
// @access    public
const getProducts = asyncHandler(async (req, res) => {                // asyncHandler est un middleware qui catch les erreurs, on peut donc omettre try-catch
  const products = await Product.find({})                             // Utilise la methode find() de l'obj Product construit par mongoose
  res.json(products)
})


// @desc      Obtient un produit 
// @route     GET /api/products/:id
// @access    public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)               // Utilise la méthode findById() de l'obj Product construit par mongoose
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not nound')
  }
})

export { getProducts, getProductById }