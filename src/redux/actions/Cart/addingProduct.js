import axios from "axios";
import { ADD_TO_CART } from "../actions-types";
import { URL_LINK } from '../../../URL.js';

export const addToCart = (customerId, productId, productQuantity, totalPrice, discounts) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL_LINK}/cart/create`, {
        productQuantity,
        customerId,
        productId,
        totalPrice,
        discounts,
      });
      dispatch({
        type: ADD_TO_CART,
      });
    } catch (error) {
      console.error('Error al agregar el producto al carrito', error);
    }
  };
};