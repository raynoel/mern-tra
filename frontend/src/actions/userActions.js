import axios from 'axios'
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
} from '../constants/userConstants'



// Login -> Le backend vérifie l/p et retourne userInfo qu'on enregistre dans le store { userLogin: { userInfo: { _id, name, email, isAdmin, token }}}  
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = {  headers: { 'Content-Type': 'application/json' }}
    const { data } = await axios.post( '/api/users/login', { email, password }, config )  // Vérifie l/p et obtient userInfo
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })                                 // Enregistre 'userInfo' dans le store
    localStorage.setItem('userInfo', JSON.stringify(data))                                // Enregistre 'userInfo' dans localStorage
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



// Enregistre dans la DB, le store et localStorage { userLogin: { userInfo: { _id, name, email, isAdmin, token }}}  
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const config = { headers: { 'Content-Type': 'application/json' }}
    const { data } = await axios.post( '/api/users', { name, email, password }, config )    // Enregistre dans la DB
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })                                // Enregistre 'userRegister' dans le state
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })                                   // Enregistre 'userInfo' dans le state
    localStorage.setItem('userInfo', JSON.stringify(data))                                  // Enregistre 'userInfo' dans localStorage
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

