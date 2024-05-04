import axios from 'axios';
import { URL_LINK } from '../../../URL.js';
import { UPDATE_CART_ITEM } from "../actions-types";

export const updateProduct = (cartId, productId, productQuantity) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${URL_LINK}/cart/update`, { cartId, productId, productQuantity });
        dispatch({ type: UPDATE_CART_ITEM, payload: response.data.updatedCart });
      } catch (error) {
        console.error('Error actualizando el ítem del carrito:', error);
      }
    };
  };