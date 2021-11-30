import axios from 'axios'
import { 
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants"


// Obtient la liste des produits de la DB et l'enregistre dans le store sous {productList: products}
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/products')                             // Obtient la liste de MongoDB
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })                       // enregistre la liste dans le store
  } catch (error) {
    dispatch({ 
      type: PRODUCT_LIST_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}

// Obtient un produit par sont ID de la DB et l'enregistre dans le store sous {productDetails: product}
export const listProductDetails = (id) => async (dispatch) => {
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