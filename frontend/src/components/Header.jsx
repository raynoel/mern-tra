import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from '../actions/userActions'
import "font-awesome/css/font-awesome.css";


const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)                  // Extrait { _id, name, email, token } du store
  const logoutHandler = () => { dispatch(logout())  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'><Nav.Link><i className='fa fa-shopping-cart'></i> Cart</Nav.Link></LinkContainer>
              {/* Si login, affiche le nom du visiteur + drop-down qui affiche 'profile' & 'logout' */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : <LinkContainer to='/login'><Nav.Link><i className='fa fa-user'></i> Sign In</Nav.Link></LinkContainer> }
              {/* menu admin */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'><NavDropdown.Item>Users</NavDropdown.Item></LinkContainer>
                  <LinkContainer to='/admin/productlist'><NavDropdown.Item>Products</NavDropdown.Item></LinkContainer>
                  <LinkContainer to='/admin/orderlist'><NavDropdown.Item>Orders</NavDropdown.Item></LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header