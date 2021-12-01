// Les Controllers sont appelés par les productRoutes.js et implémentent les fonctionnalitées
import asyncHandler from 'express-async-handler';                     // Gère les erreurs async sans bloc try-catch
import Product from '../models/productModel.js'

// @desc      Obtient tous les produits 
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


// @desc      Supprime un produit 
// @route     DELETE /api/products/:id
// @access    Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  // if (req.user._id === product.user._id){                          // Si on voudrait Limiter la suppression à l'admin qui a ajouté le produit
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})



// @desc    Cré un produit (On cré un produit avec un template qui sera modifié tout de suite via 'updateProduct')
// @route   POST /api/products
// @access  Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})



// @desc    Modifie un produit
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }