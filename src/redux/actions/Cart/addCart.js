import axios from "axios";
import {  ADD_CART } from "../actions-types.js";
import { URL_LINK } from '../../../URL.js'

export const addCart = (productId) => {
    //type: ADD_CART,
    //payload: productId
    console.log('Desde actions:', productId)
    return async (dispatch) => {
      try {
        const response = await axios.put(`${URL_LINK}/cart/create`, {
          productId,
        });
        
        dispatch({
          type: ADD_CART,
          payload: response,
        });
      } catch (error) {
        console.error('Error al agregar el producto al carrito', error);
      }
    };
  };