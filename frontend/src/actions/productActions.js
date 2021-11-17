import axios from 'axios'
import { 
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants"


// Série d'actions à exécuter lors de l'appel => dispatch(listProducts)
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })                                  // Exécute PRODUCT_LIST_REQUEST défini dans les reducers
    const { data } = await axios.get('/api/products')                         // Obtient la liste des produits de MongoDB
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })                   // Exécute PRODUCT_LIST_SUCCESS défini dans les reducers
  } catch (error) {
    dispatch({ 
      type: PRODUCT_LIST_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}

// Série d'actions à exécuter lors de l'appel => dispatch(listProductDetails)
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })                                   // Exécute PRODUCT_DETAILS_REQUEST défini dans les reducers
    const { data } = await axios.get(`/api/products/${id}`)                       // Obtient le produit de MongoDB
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })                    // Exécute PRODUCT_DETAILS_SUCCESS défini dans les reducers
  } catch (error) {
    dispatch({ 
      type: PRODUCT_DETAILS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}