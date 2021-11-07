import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants"


export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })                                  // Exécute PRODUCT_LIST_REQUEST
    const { data } = await axios.get('/api/products')                         // Obtient la liste des produits de MongoDB
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })                   // Exécute PRODUCT_LIST_SUCCESS
  } catch (error) {
    dispatch({ 
      type: PRODUCT_LIST_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}

