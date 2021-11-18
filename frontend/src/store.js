import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'                                         // permet de faire des action async sur le store
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

// Obtient le cart du localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk] 

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store