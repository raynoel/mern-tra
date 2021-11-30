import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader.jsx'
import { listProducts } from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, products, page, pages } = useSelector((state) => state.productList)
  // const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector((state) => state.productDelete)
  // const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = useSelector((state) => state.productCreate)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts)
    } else {
      history.push('/login')
    }
  }, [ dispatch, history, userInfo ])


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      // DISPATCH -> deleteProduct(id)
    }
  }

  const createProductHandler = () => {
    // DISPATCH -> createProduct()
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Produits</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}><i className='fa fa-plus'></i> Créer un produit</Button>
        </Col>
      </Row>
      {loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOM</th>
                <th>PRIX</th>
                <th>CATEGORIE</th>
                <th>MARQUE</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className='text-center'>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'><i className='fa fa-edit'></i></Button>
                    </LinkContainer>
                  </td>
                  <td className='text-center'><Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}><i className='fa fa-trash'></i></Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen
