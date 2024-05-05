import axios from "axios";
import { REMOVE_CART } from "../actions-types";
import { URL_LINK } from '../../../URL.js';

export const removeCart = (productId) => {
  //const payload = Array.from({ length: productQuantity }, () => productId);
  //console.log(payload)
  return {
    type: REMOVE_CART,
    payload: productId,
    //payload: payload,
  };
};

// export const removeCart = (cartId, productId) => {
//     return async (dispatch) => {
//       try {
//         await axios.delete(`${URL_LINK}/cart/${cartId}/products/${productId}`);
//         dispatch({ type: REMOVE_FROM_CART, payload: productId });
//       } catch (error) {
//         console.error('Error eliminando producto del carrito:', error);
//       }
//     };
//   };
