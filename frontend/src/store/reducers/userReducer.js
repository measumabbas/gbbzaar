
import { UPDATE_ART_RESET } from '../constants/artConstants';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, CLEAR_ERRORS, LOGOUT_FAIL, LOGOUT_SUCCESS,VERIFY_USER_EMAIL_FAIL,VERIFY_USER_EMAIL_SUCCESS,VERIFY_USER_EMAIL_REQUEST,CLEAR_USER_EMAIL_VERIFY_ERRORS,USER_EMAIL_VERIFIED,UPDATE_USER_DETAIL_REQUEST,UPDATE_USER_DETAIL_SUCCESS,UPDATE_USER_DETAIL_FAIL,UPDATE_USER_DETAILS_DONE,UPDATE_USER_DETAILS_CLEAR_ERRORS,GET_USER_REQUEST,GET_USER_SUCCESS,GET_USER_FAIL, FORGET_PASS_REQUEST, FORGET_PASS_SUCCESS, FORGET_PASS_FAIL, FORGET_PASS_RESET, VERIFY_PASS_REQUEST, VERIFY_PASS_SUCCESS, VERIFY_PASS_FAIL, VERIFY_PASS_RESET, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL } from '../constants/userConstants'


export const tokenReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                isAllDetails:false
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                isAuthenticated: true,
                isEmailVerified:action.payload.isEmailVerified,
                isAllDetails:action.payload.isAllDetails
            };
      
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                token: null,
                isAuthenticated: false,
                isEmailVerified:null
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                token: null,
                error: {
                    code:action.payload.status,
                    message:action.payload.data.error
                },
                isAuthenticated: false,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case USER_EMAIL_VERIFIED :
            return{
                ...state,
                isEmailVerified:true
            }
        case UPDATE_USER_DETAILS_DONE:
            return{
                ...state,
                isAllDetails:true
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                
            };
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                user: null,
                error: action.payload,
            };

        default:
            return state;
    }
};


export const userEmailVerifyReducer = (state = {},action)=>{
    switch(action.type){
        case VERIFY_USER_EMAIL_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case VERIFY_USER_EMAIL_SUCCESS:
            return {
                ...state,
                success:true,
                loading:false
            }
        case VERIFY_USER_EMAIL_FAIL:
            return{
                ...state,
                loading:false,
                success:false,
                error:action.payload
            }
        case CLEAR_USER_EMAIL_VERIFY_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}



export const updateUserReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_USER_DETAIL_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_USER_DETAIL_SUCCESS:
            return{
                ...state,
                success:true,
                loading:false
            }
        case UPDATE_USER_DETAIL_FAIL:
            return{
                ...state,
                loading:false,
                success:false,
                error:action.payload
            }
        case UPDATE_USER_DETAILS_CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}


export const getUserReducer = (state={},action)=>{
    switch(action.type){
        case GET_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case GET_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                user:action.payload
            }
        case GET_USER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.error
            }
        default:
            return state
    }
}

export const updatePasswordRequest = (state={},action)=>{
    switch(action.type){
        case FORGET_PASS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FORGET_PASS_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                email:action.payload
            }
        case FORGET_PASS_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case FORGET_PASS_RESET:
            return{
                ...state,
                loading:false,
                success:false,
                error:null
            }
        default:
            return state
    }
}

export const verifyPassword = (state={},action)=>{
    switch(action.type){
        case VERIFY_PASS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case VERIFY_PASS_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true
            }
        case VERIFY_PASS_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case VERIFY_PASS_RESET:
            return{
                ...state,
                loading:false,
                success:false,
                error:null
            }
        default:
            return state
    }
}

export const updatePassword = (state={},action)=>{
    switch(action.type){
        case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true
            }
        case UPDATE_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case UPDATE_ART_RESET:
            return{
                ...state,
                loading:false,
                success:false,
                error:null
            }
        default:
            return state
    }
}