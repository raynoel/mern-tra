import axios from 'axios'
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
} from '../constants/userConstants'


// Login -> Le backend vérifie l/p et retourne userInfo qu'on enregistre dans le store { userLogin: { userInfo: { _id, name, email, isAdmin, token }}}  
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = {  headers: { 'Content-Type': 'application/json' }}
    const { data } = await axios.post( '/api/users/login', { email, password }, config )  // Vérifie l/p et obtient le userInfo
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })                                 // Enregistre 'userInfo' dans le store
    localStorage.setItem('userInfo', JSON.stringify(data))                                // enregistre 'userInfo' dans localStorage
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}