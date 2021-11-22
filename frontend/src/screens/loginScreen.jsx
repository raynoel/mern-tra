import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader.jsx'
import FormContainer from '../components/FormContainer.jsx'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [ email, setEmail ] = useState('')                                      // Cré un state pour 'email' pour le champ
  const [ password, setPassword ] = useState('')                                // un state password pour le champ password
  const dispatch = useDispatch()                                                // pour modifier le store redux
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)  // extrait login, error, userInfo de store
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Redirige l'usagé si ses infos sont dans store.js (puisé dans le localStorage)
  useEffect(() => {
      if (userInfo) { history.push(redirect) }
  }, [history, userInfo, redirect] )

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))                                            // Exécute l'action 'login' du store-redux
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
      </Row>
    </FormContainer>
   );
}

export default LoginScreen;