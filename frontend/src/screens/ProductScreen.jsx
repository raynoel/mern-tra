import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating.jsx'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ match }) => {                                    // match === param du URL
  const dispatch = useDispatch()                                          // useDispatch() retourne une ref à store.dispatch()

  const { loading, error, product } = useSelector((state => state.productDetails)) // useSelector is a function that takes the current state as an argument and returns whatever data you want from it.

  useEffect(() => {                                                       // obtient le produit quand la page load ou :id change
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  return (
    <div>
      <Link className='btn btn-light my-3' to="/">Go Back</Link>
      { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
          <Col md={6}><Image src={product.image} alt={product.name} fluid /></Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
              <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup.Item>
                <Row>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ProductScreen
