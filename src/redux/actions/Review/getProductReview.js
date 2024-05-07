import axios from "axios";
import { GET_PRODUCT_REVIEW } from "../actions-types.js";
import { URL_LINK } from "../../../URL.js";

const getProductReview = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL_LINK}/review/${id}`);
      return dispatch({
        type: GET_PRODUCT_REVIEW,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener las review del producto", error);
      dispatch({ type: GET_PRODUCT_REVIEW, payload: error });
    }
  };
};

export default getProductReview;
