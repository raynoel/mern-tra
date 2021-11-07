import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'                                         // permet de faire des action sur le store async
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store