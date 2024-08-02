import {
  UPLOAD_ART_REQUEST,
  UPLOAD_ART_SUCCESS,
  UPLOAD_ART_FAIL,
  GET_ALL_ARTS_REQUEST,
  GET_ALL_ARTS_SUCCESS,
  GET_ALL_ARTS_FAIL,
  GET_USER_ARTS_REQUEST,
  GET_USER_ARTS_SUCCESS,
  GET_USER_ARTS_FAIL,
  DELETE_USER_ART_REQUEST,
  DELETE_USER_ART_SUCCESS,
  DELETE_USER_ART_FAIL,
  LOAD_ART_REQUEST,
  LOAD_ART_SUCCESS,
  LOAD_ART_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
  GET_ART_REVIEWS_REQUEST,
  GET_ART_REVIEWS_SUCCESS,
  GET_ART_REVIEWS_FAIL,
  ADD_REVIEW_REST,
  UPLOAD_ART_RESET,
  UPDATE_ART_REQUEST,
  UPDATE_ART_SUCCESS,
  UPDATE_ART_FAIL,
  UPDATE_ART_RESET,
} from "../constants/artConstants";
export const uploadArtReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_ART_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case UPLOAD_ART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        art: action.payload,
      };
    case UPLOAD_ART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPLOAD_ART_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const getAllArts = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ARTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_ARTS_SUCCESS:
      return {
        ...state,
        loading: false,
        arts: action.payload,
      };
    case GET_ALL_ARTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getUserArts = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_ARTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_ARTS_SUCCESS:
      return {
        ...state,
        loading: false,
        arts: action.payload,
      };
    case GET_USER_ARTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteUserArt = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_ART_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case DELETE_USER_ART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DELETE_USER_ART_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const getSingleArt = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ART_SUCCESS:
      return {
        ...state,
        loading: false,
        art: action.payload,
      };
    case LOAD_ART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_REVIEW_REST:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const getArtReviews = (state = {}, action) => {
  switch (action.type) {
    case GET_ART_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ART_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case GET_ART_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const updateArt = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case UPDATE_ART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ART_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
      };
    }
    default:
      return state;
  }
};
