import {
  MAKE_OFFER_FAIL,
  MAKE_OFFER_REQUEST,
  MAKE_OFFER_SUCCESS,
  RESET_MAKE_OFFER,
  GET_OFFERS_REQUEST,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_FAIL,
  ACCEPT_OFFER_FAIL,
  ACCEPT_OFFER_REQUEST,
  ACCEPT_OFFER_SUCCESS,
} from "../constants/offerConstants";

export const offerReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_OFFERS_REQUEST:
      return {
        ...state,
        getLoading: true,
      };
    case GET_OFFERS_SUCCESS:
      return {
        ...state,
        getLoading: false,
        offers: action.payload,
      };
    case GET_OFFERS_FAIL:
      return {
        ...state,
        getLoading: false,
        getError: action.payload,
      };
    case MAKE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case MAKE_OFFER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_MAKE_OFFER:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
      };
    case ACCEPT_OFFER_REQUEST:
      return {
        ...state,
        acceptLoading: true,
      };
    case ACCEPT_OFFER_SUCCESS:
      return {
        ...state,
        acceptLoading: false,
        acceptSuccess: true,
      };
    case ACCEPT_OFFER_FAIL:
      return {
        ...state,
        acceptLoading: false,
        acceptError: action.payload,
      };

    default:
      return state;
  }
};
