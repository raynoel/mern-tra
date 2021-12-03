import axios from 'axios'
import { 
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, 
  PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL,
} from "../constants/productConstants"


// Obtient la liste des produits de la DB et l'enregistre dans le store sous {productList: products}
export const listProducts = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get(`/api/products?keyword=${keyword}`)          // Obtient la liste de MongoDB
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })                       // enregistre la liste dans le store
  } catch (error) {
    dispatch({ 
      type: PRODUCT_LIST_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}

// Obtient un produit par sont ID de la DB et l'enregistre dans le store sous {productDetails: product}
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)                       // Obtient le produit de MongoDB
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })                    // enregistre le produit dans le store
  } catch (error) {
    dispatch({ 
      type: PRODUCT_DETAILS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}


// Supprime un produit de la DB 
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` }}
    await axios.delete(`/api/products/${id}`, config)
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_DELETE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}


// Ajoute un produit dans la DB et dans le store sous { productCreate: product }
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { Authorization: `Bearer ${userInfo.token}`}}
    const { data } = await axios.post(`/api/products`, {}, config)
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: PRODUCT_CREATE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}



export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` }}
    const { data } = await axios.put(`/api/products/${product._id}`, product, config )
    dispatch({ type: PRODUCT_UPDATE_SUCCESS,  payload: data })              // enregistre le produit sous { productUpdate: product }
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })              // enregistre le produit sous { productDetails: product }
  } catch (error) {
    dispatch({ 
      type: PRODUCT_UPDATE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}



export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` }}
    await axios.post(`/api/products/${productId}/reviews`, review, config)
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS }) 
  } catch (error) {
    dispatch({ 
      type: PRODUCT_CREATE_REVIEW_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}
