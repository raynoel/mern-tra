// MainSection dans la page principale affichant les produits en vente. Chaque produit dans une carte (photo, nom, rating, prix, num reviews)
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.jsx'
import axios from 'axios'

const HomeScreen = () => {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {                                   // obtient la liste des produits quand la page load
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        { products.map(product => ( 
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen