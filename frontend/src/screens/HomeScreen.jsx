import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product.jsx"
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from '../components/Paginate.jsx'
import { listProducts } from '../actions/productActions.js'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const { loading, error, products, page, pages } = useSelector(state => state.productList)

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))                                  // 'listProducts()' de productActions.js obtient 'products', 'loading' et 'error'
  }, [dispatch, keyword, pageNumber])


  return (
    <>
      <h1>Latest Products</h1>
      { loading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> : ( 
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomeScreen;