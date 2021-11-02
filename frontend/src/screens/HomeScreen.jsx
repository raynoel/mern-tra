// MainSection affichant les produits en vente. Chaque produit dans une carte (photo, nom, rating, prix, num reviews)
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products.js'
import Product from '../components/Product.jsx'

const HomeScreen = () => {
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        { products.map(product => ( 
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen