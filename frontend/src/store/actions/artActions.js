
import axios from 'axios'
import {UPLOAD_ART_REQUEST,UPLOAD_ART_SUCCESS,UPLOAD_ART_FAIL,GET_ALL_ARTS_REQUEST,GET_ALL_ARTS_SUCCESS,GET_ALL_ARTS_FAIL,GET_USER_ARTS_REQUEST,GET_USER_ARTS_SUCCESS,GET_USER_ARTS_FAIL, DELETE_USER_ART_REQUEST, DELETE_USER_ART_SUCCESS, DELETE_USER_ART_FAIL, LOAD_ART_REQUEST, LOAD_ART_SUCCESS, LOAD_ART_FAIL, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL, GET_ART_REVIEWS_REQUEST, GET_ART_REVIEWS_SUCCESS, GET_ART_REVIEWS_FAIL, UPDATE_ART_REQUEST, UPDATE_ART_SUCCESS, UPDATE_ART_FAIL} from '../constants/artConstants'


export const uploadArt = (artData)=> async (dispatch)=>{
    try {

        dispatch({type:UPLOAD_ART_REQUEST})

        const {data} = await axios.post('http://localhost:4000/api/v1/arts/create',artData)
        
        dispatch({type:UPLOAD_ART_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:UPLOAD_ART_FAIL,payload:error.response.data.error})
    }
}


export const getAllArts = (category)=> async (dispatch)=>{
    try {
        dispatch({type:GET_ALL_ARTS_REQUEST})
        let url = 'http://localhost:4000/api/v1/arts'
        if(category !== 'All'){
            url+=`?category=${category}`
        }
       
        const {data} = await axios.get(url)
        

        dispatch({type:GET_ALL_ARTS_SUCCESS,payload:data.arts})
    } catch (error) {
        dispatch({type:GET_ALL_ARTS_FAIL,payload:error})
    }
}


export const getUserArts = (id)=> async (dispatch,getState)=>{
    try {
        // const {user} = getState().user
        dispatch({type:GET_USER_ARTS_REQUEST})
        const {data} = await axios.post('http://localhost:4000/api/v1/arts/me',{id})
        dispatch({type:GET_USER_ARTS_SUCCESS,payload:data.arts})
        // console.log(user)
    } catch (error) {
        dispatch({type:GET_USER_ARTS_FAIL,payload:error})
    }
}


export const deleteUserArt = (id)=> async(dispatch)=>{
    try {
        dispatch({type:DELETE_USER_ART_REQUEST})

        await axios.delete(`http://localhost:4000/api/v1/arts/${id}`)
        dispatch({type:DELETE_USER_ART_SUCCESS})
    } catch (error) {
        dispatch({type:DELETE_USER_ART_FAIL})
    }
}

export const getSingleArt = (id)=> async (dispatch)=>{
    try {
        dispatch({type:LOAD_ART_REQUEST})
        const {data} = await axios.get(`http://localhost:4000/api/v1/arts/${id}`)
        dispatch({type:LOAD_ART_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:LOAD_ART_FAIL,payload:error})
    }
}


export const addArtReview = (userData) => async (dispatch)=>{
    try {
        dispatch({type:ADD_REVIEW_REQUEST})
        const {data} = await axios.post(`http://localhost:4000/api/v1/arts/reviews/add`,userData)
        dispatch({type:ADD_REVIEW_SUCCESS})
    } catch (error) {
        dispatch({type:ADD_REVIEW_FAIL,payload:error.response.data.error})
    }
}

export const getArtReviews = (id)=> async (dispatch)=>{
    try {
        dispatch({type:GET_ART_REVIEWS_REQUEST})
        const {data} = await axios.get(`http://localhost:4000/api/v1/arts/reviews/get?id=${id}`)
        dispatch({type:GET_ART_REVIEWS_SUCCESS,payload:data.reviews})
    } catch (error) {
        console.log(error)
        dispatch({type:GET_ART_REVIEWS_FAIL,payload:error.response.data.error})
    }
}

export const updateArt = (userData)=> async (dispatch)=>{
    try {
        console.log(userData)
        dispatch({type:UPDATE_ART_REQUEST})
        const {data} = await axios.put(`http://localhost:4000/api/v1/arts/${userData.artId}`,userData)
        dispatch({type:UPDATE_ART_SUCCESS})
    } catch (error) {
        dispatch({type:UPDATE_ART_FAIL,payload:error.response.data.error})
    }
}

