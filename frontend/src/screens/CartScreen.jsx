import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message.jsx'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id                                         // Extrait le id du url
  const qty = location.search ? Number(location.search.split('=')[1]) : 1   // Extrait la qty du url (?qty=4)

  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)
  console.log(cartItems)

  useEffect(() => {
    if (productId) {                                                        // si la page est appelée avec un id dans la url (/cart/id)
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div>
      Cart
    </div>
  )
}

export default CartScreen
