import axios from "axios";
import {
  CREATE_PDF_FAIL,
  CREATE_PDF_REQUEST,
  CREATE_PDF_RESET_STATE,
  CREATE_PDF_SUCCESS,
  GET_ALL_PDF_FAIL,
  GET_ALL_PDF_REQUEST,
  GET_ALL_PDF_SUCCESS,
} from "../constants/pdfConstants";


export const uploadPdf = (apiData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PDF_REQUEST });

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/pdf/create",
      apiData,
      {
        headers:{
          "Content-Type":'multipart/form-data'
        }
      }
    );

    dispatch({ type: CREATE_PDF_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PDF_FAIL, payload: error.response.data.error });
  }
};
export const getAllPdfs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PDF_REQUEST });

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/pdf/all"
    );

    dispatch({ type: GET_ALL_PDF_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: GET_ALL_PDF_FAIL, payload: error.response.data.error });
  }
};


export const clearPdfState = ()=> (dispatch)=>{
  dispatch({type:CREATE_PDF_RESET_STATE})
}