import {
  CREATE_PDF_FAIL,
  CREATE_PDF_REQUEST,
  CREATE_PDF_RESET_STATE,
  CREATE_PDF_SUCCESS,
  GET_ALL_PDF_FAIL,
  GET_ALL_PDF_REQUEST,
  GET_ALL_PDF_SUCCESS,
} from "../constants/pdfConstants";

export const pdfReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PDF_REQUEST:
      return {
        ...state,
        addLoading: true,
      };
    case CREATE_PDF_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
      };
    case CREATE_PDF_FAIL:
      return {
        ...state,
        addLoading: false,
        addError: action.payload,
      };
    case CREATE_PDF_RESET_STATE:
      return {
        ...state,
        success: false,
        addSuccess:false,
        addError:null,
        error: null,
      };
    case GET_ALL_PDF_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PDF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ALL_PDF_SUCCESS:
      return {
        ...state,
        loading: false,
        pdfs: action.payload,
      };
    default:
      return state;
  }
};
