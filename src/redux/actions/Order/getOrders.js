import axios from "axios";
import { GET_ORDERS } from "../actions-types";
import { URL_LINK } from '../../../URL.js'

const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_LINK}/order/`);
      return dispatch({
        type: GET_ORDERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default getAllOrders;

