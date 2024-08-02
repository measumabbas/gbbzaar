import axios from "axios";
import {
  MAKE_OFFER_REQUEST,
  MAKE_OFFER_FAIL,
  MAKE_OFFER_SUCCESS,
  RESET_MAKE_OFFER,
  GET_OFFERS_REQUEST,
  GET_OFFERS_FAIL,
  GET_OFFERS_SUCCESS,
  ACCEPT_OFFER_FAIL,
  ACCEPT_OFFER_REQUEST,
  ACCEPT_OFFER_SUCCESS,
} from "../constants/offerConstants";
export const createOffer = (apiData) => async (dispatch) => {
  try {
    dispatch({ type: MAKE_OFFER_REQUEST });

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/offer/create",
      apiData
    );

    dispatch({ type: MAKE_OFFER_SUCCESS });
  } catch (error) {
    dispatch({ type: MAKE_OFFER_FAIL, payload: error.response.data.error });
  }
};
export const getAllOffers = (apiData) => async (dispatch) => {
  try {
    dispatch({ type: GET_OFFERS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/v1/offer/get/${apiData.id}?mode=${apiData.mode}`
    );

    dispatch({ type: GET_OFFERS_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: GET_OFFERS_FAIL, payload: error.response.data.error });
  }
};
export const acceptOffer = (apiData) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_OFFER_REQUEST });

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/offer/accept`,
      apiData.data
    );

    dispatch({ type: ACCEPT_OFFER_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: ACCEPT_OFFER_FAIL, payload: error.response.data.error });
  }
};
export const resetCreateOffer = () => async (dispatch) => {
  dispatch({ type: RESET_MAKE_OFFER });
};
