import axios from "axios";
import { CREATE_CART } from "../actions-types.js";
import { URL_LINK } from '../../../URL.js';

export const createCart = ( productId, productQuantity ) => {
  //const payload = Array.from({ length: productQuantity }, () => productId);
  const payload = Array(productQuantity).fill(productId);
  console.log(payload)
  return {
    type: CREATE_CART,
    //payload: 
    payload: payload,
  };
};

// export const createCart = (customerId, productId, productQuantity) => {
//   console.log('Desde actions:', customerId, productId, productQuantity)
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(`${URL_LINK}/cart/create`, {
//         productQuantity,
//         customerId,
//         productId,
//       });
//       dispatch({
//         type: CREATE_CART,
//         payload: response
//       });
//     } catch (error) {
//       console.error('Error al agregar el producto al carrito', error);
//     }
//   };
// };