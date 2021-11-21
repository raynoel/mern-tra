import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'                                         // permet de faire des action async sur le store
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList:    productListReducer,
  productDetails: productDetailsReducer,
  cart:           cartReducer,
  userLogin:      userLoginReducer,
})

// Obtient le cart et userInfo du localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage  = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

// Initial state du store
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk] 

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store