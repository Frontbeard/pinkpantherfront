import axios from "axios";
import { GET_ORDERS } from "../actions-types";
import { URL_LINK } from "../../../URL";


const getAllOrders = (accessToken) => {
  return async (dispatch) => {

    try {
      const config = {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
      const { data } = await axios(`${URL_LINK}/order/allOrders`, config);
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