import axios from "axios";
import { GET_ORDERS_ID } from "../actions-types";
import { URL_LINK } from "../../../URL.js";

const getAllOrdersById = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL_LINK}/order/:customerId`);
      return dispatch({
        type: GET_ORDERS_ID,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener las ordenes del customer", error);
      dispatch({ type: GET_ORDERS_ID, payload: error });
    }
  };
};

export default getAllOrdersById;
