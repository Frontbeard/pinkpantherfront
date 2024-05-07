import axios from "axios";
import { GET_ORDERID } from "../actions-types";
import { URL_LINK } from "../../../URL";

const getOrdersByUser = ({userId, accessToken}) => {
    // console.log(userId);
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                  authorization: `Bearer ${accessToken}`
                }
              }
            
            const { data } = await axios.get(`${URL_LINK}/order/user` + userId, config);
            // console.log(data);
            return dispatch({
                type: GET_ORDERID,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}
export default getOrdersByUser