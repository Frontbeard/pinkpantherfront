import axios from "axios";
import { REMOVE_CART } from "../actions-types";
import { URL_LINK } from '../../../URL.js';

export const removeCart = (cartId, productId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`${URL_LINK}/cart/${cartId}/products/${productId}`);
        dispatch({ type: REMOVE_FROM_CART, payload: productId });
      } catch (error) {
        console.error('Error eliminando producto del carrito:', error);
      }
    };
  };
