// Chaque bon de commande payé est enregistré dans la DB.
// Ce controller offre les fonctions pour enregistrer une commande, obtenir une commande par ID, modifier une commande
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @desc    Enregistre une commande dans la DB
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    // Cré une nouvelle rangée dans la DB
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})


// @desc    Obtient une commande de la DB selon son ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate( 'user', 'name email' ) // Obtient la commande et y ajoute le champ "user": { "name": "", "email": ""} provenant de la collection "users" de la DB
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export { addOrderItems, getOrderById }
