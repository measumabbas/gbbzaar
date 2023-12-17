import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, CLEAR_ERRORS, LOGOUT_FAIL, LOGOUT_SUCCESS,VERIFY_USER_EMAIL_FAIL,VERIFY_USER_EMAIL_SUCCESS,VERIFY_USER_EMAIL_REQUEST, USER_EMAIL_VERIFIED,UPDATE_USER_DETAIL_REQUEST,UPDATE_USER_DETAIL_SUCCESS,UPDATE_USER_DETAIL_FAIL,UPDATE_USER_DETAILS_DONE,UPDATE_USER_DETAILS_CLEAR_ERRORS, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAIL, FORGET_PASS_REQUEST, FORGET_PASS_SUCCESS, FORGET_PASS_FAIL, VERIFY_PASS_REQUEST, VERIFY_PASS_SUCCESS, VERIFY_PASS_RESET, VERIFY_PASS_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL } from '../constants/userConstants'
import axios from 'axios';
import {persistor} from '../store'

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      // const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/users/login`,
        { email, password },
        // config
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        console.log(error)
      dispatch({ type: LOGIN_FAIL, payload: error.response });
    }
  };
  
  // Register
  export const register = (userData) => async (dispatch) => {
    // console.log(userData.name)
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
    //   const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`http://localhost:4000/api/v1/users/new`, {name:userData.name,userName:userData.userName,email:userData.email,password:userData.password});

      // console.log(data)
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
        // console.log(error.response.status)
        console.log('here')
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response
      });
    }
  };
  
  // Load User
  export const loadUser = () => async (dispatch,getState) => {

    // console.log(getState().token.token)

    const {token} = getState().token
    
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`http://localhost:4000/api/v1/users/me`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      // console.log(error)
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error });
    }
  };


  export const userEmailVerify = (token)=> async (dispatch,getState)=>{
    try {
      dispatch({type:VERIFY_USER_EMAIL_REQUEST})
      const {user:{email}} = getState().user
      const {data} = await axios.post('http://localhost:4000/api/v1/users/verify',{email,token})
      dispatch({type:VERIFY_USER_EMAIL_SUCCESS})
      dispatch({type:USER_EMAIL_VERIFIED})
    } catch (error) {
      dispatch({ type: VERIFY_USER_EMAIL_FAIL, payload: error.response.data.error });
    }
  }


  export const updateUserData = (userData) => async (dispatch,getState)=>{
    try {
      dispatch({type:UPDATE_USER_DETAIL_REQUEST})
      const {user:{email}} = getState().user

      const data = {
        email,
        wNumber:userData.wNumber,
        cNumber:userData.cNumber,
        address:userData.address,
        profileUrl:userData.profileUrl
      }
      
      // console.log(userData)
      

      // const config = {headers:{"content-type":"multipart/form-data"}}
      await axios.post('http://localhost:4000/api/v1/users/update',data)
      dispatch({type:UPDATE_USER_DETAIL_SUCCESS})
      dispatch({type:UPDATE_USER_DETAILS_DONE})

    } catch (error) {
      dispatch({type:UPDATE_USER_DETAIL_FAIL,payload:error.response.data.error})
    }
  }

  export const getUser = (id)=>async (dispatch)=>{
    try {
      dispatch({type:GET_USER_REQUEST})

      const {data} = await axios.get(`http://localhost:4000/api/v1/users/get?id=${id}`)
      dispatch({type:GET_USER_SUCCESS,payload:data.user})
    } catch (error) {
      dispatch({type:GET_USER_FAIL,payload:error.response.data.error})
    }
  }


  export const updatePasswordRequest = (email)=>async (dispatch)=>{
    try {
      dispatch({type:FORGET_PASS_REQUEST})
      const {data} = await axios.post('http://localhost:4000/api/v1/users/forgot',{email})
      dispatch({type:FORGET_PASS_SUCCESS,payload:email})
    } catch (error) {
      dispatch({type:FORGET_PASS_FAIL,payload:error.response.data.error})
      console.log(error)
    }
  }
  export const verifyPassword = (token)=>async (dispatch,getState)=>{
    try {
      const {email} = getState().updatePass
      console.log(email)
      dispatch({type:VERIFY_PASS_REQUEST})
      const {data} = await axios.post('http://localhost:4000/api/v1/users/forgot/verify',{email,token})
      dispatch({type:VERIFY_PASS_SUCCESS})
    } catch (error) {
      dispatch({type:VERIFY_PASS_FAIL,payload:error.response.data.error})
    }
  }

  export const updatePassword = (password)=>async (dispatch,getState)=>{
    try {
      const {email} = getState().updatePass
      console.log(email)
      dispatch({type:UPDATE_PASSWORD_REQUEST})
      const {data} = await axios.put('http://localhost:4000/api/v1/users/forgot/update',{email,password})
      dispatch({type:UPDATE_PASSWORD_SUCCESS})
    } catch (error) {
      dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data.error})
    }
  }

  export const handleLogout = ()=> (dispatch)=>{
    persistor.purge()
    dispatch({type:LOGOUT_SUCCESS})
  }