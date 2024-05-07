import axios from "axios";
import { GET_ORDERS } from "../actions-types";
import { URL_LINK } from "../../../URL.js";

const getAllOrders = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL_LINK}/order/`);
      return dispatch({
        type: GET_ORDERS,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener las ordenes del customer", error);
      dispatch({ type: GET_ORDERS, payload: error });
    }
  };
};

export default getAllOrders;
