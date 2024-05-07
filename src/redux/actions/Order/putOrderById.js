import axios from "axios";
import { PUT_ORDER } from "../actions-types";
import { URL_LINK } from "../../../URL";


const putOrderById = (order, status, accessToken) => {
  return async (dispatch) => {

    try {
      const config = {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
      const { data } = await axios.put(`${URL_LINK}/order/update`, {id: order.id,status: status} , config);
      
    } catch (error) {
      console.log(error);
    }
  };
};

export default putOrderById;