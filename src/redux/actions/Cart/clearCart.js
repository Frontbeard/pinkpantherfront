import axios from "axios";
import { CLEAR_CART } from "../actions-types.js";
import { URL_LINK } from '../../../URL.js';

export const clearCart = () => {
  return {
    type: CLEAR_CART,
    //payload: customerId,
  };
};

// export const clearCart = (customerId) => {
//     return async (dispatch) => {
//       try {
//         await axios.delete(`${URL_LINK}/cart/${customerId}/products`);
//         dispatch({ type: CLEAR_CART });
//       } catch (error) {
//         console.error('Error clearing cart:', error);
//       }
//     };
//   };
