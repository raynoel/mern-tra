import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader.jsx'
import { getOrderDetails } from '../actions/orderActions'



const OrderScreen = ({ match }) => {
  const orderId = match.params.id                               
  const dispatch = useDispatch()
  const { order, loading, error } = useSelector((state) => state.orderDetails)

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)         // Arrondi un nb à 2 dédimales (ex. "33.00")
  
  // Attend d'avoir reçu la commande de la DB pour calculer le coût des items
  if (!loading) {     
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)) 
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [ dispatch, orderId ])

  
  return loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : (
    <>
      <h1 style={{textAlign: "center"}}>Order Status</h1>
      <Row>
        {/* Info de la commande: Nom, email, adresse, méthode de payment, Items commandés */}
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order:  {order._id}</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong>{' '}<a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p><strong>Address:</strong>{' '}{order.shippingAddress.address}, {order.shippingAddress.city}{' '}{order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method: </strong>{order.paymentMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? ( <Message>Order is empty</Message> ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                        <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                        <Col md={4}>{item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Carte avec le sommaire des coûts: items, shipping, taxes, total */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${addDecimals(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
