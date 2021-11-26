import axios from 'axios'
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,
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


// fct pour importer les infos de l'usagé dans la page "ProfileScreen.jsx"
// store: userDetails: { user: { _id, name, email, isAdmin }}
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })
    const { userLogin: { userInfo }} = getState()                                     // Déconstruction... si login => obtient userInfo
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` }}
    const { data } = await axios.get(`/api/users/${id}`, config)                      // Obtient de la DB {_id, name, email, isAdmin}
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })                           // Set  {user}
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}



export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
    const { userLogin: { userInfo }} = getState()                                     // Déconstruction... si login => obtient userInfo
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` }}
    const { data } = await axios.put(`/api/users/profile`, user, config)              // Modifie l'usagé dans la DB; retourne {_id, name, email, isAdmin, token}
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  try {
    
  } catch (error) {
    
  }
}