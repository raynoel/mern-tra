// Le store est importé dans index.js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'                                         // permet de faire des action async sur le store
import { composeWithDevTools } from 'redux-devtools-extension'          // permet d'utiliser le devtool Redux dans Chrome
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './reducers/productReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'

const reducer = combineReducers({
  productCreate:  productCreateReducer,
  productDetails: productDetailsReducer,
  productList:    productListReducer,
  productUpdate:  productUpdateReducer,
  productDelete:  productDeleteReducer,
  cart:           cartReducer,
  userRegister:   userRegisterReducer,
  userLogin:      userLoginReducer,
  userDetails:    userDetailsReducer,
  userList:       userListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate:     userUpdateReducer,
  userDelete:     userDeleteReducer,
  orderCreate:    orderCreateReducer,
  orderDetails:   orderDetailsReducer,
  orderPay:       orderPayReducer,
  orderListMy:    orderListMyReducer,
  orderList:      orderListReducer,
  orderDeliver:   orderDeliverReducer,
})

// Obtient le cart, userInfo et shippingAddress du localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage  = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

// Initial state du store
const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk] 

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store