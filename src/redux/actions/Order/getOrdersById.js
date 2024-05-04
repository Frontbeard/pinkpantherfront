import axios from "axios";
import { GET_ORDERS } from "../actions-types";

const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_LINK}/order/:customerId`);
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
