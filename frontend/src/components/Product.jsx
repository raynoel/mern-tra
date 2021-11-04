// Carte contenant un produit (img + nom + rating + numReviews + prix)
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {                        // {product} permet d'extraire 'product' de 'props.product'
  return (
    <Card className='my-3 p-3rounded'>
      <Link to={`/product/${product._id}`}><Card.Img src={product.image} variant='top' /></Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}><Card.Title as='div'><strong>{product.name}</strong></Card.Title></Link>
        <Card.Text as='div'><Rating color={"#F8E825"} value={product.rating} text={`${product.numReviews} reviews`} /></Card.Text>
        <Card.Text as='h3'><div className='my-3'>${product.price}</div></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product