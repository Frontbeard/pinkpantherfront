import axios from "axios";
import { ADD_PRODUCT } from "../actions-types";

export const addProduct =(product)=>{
    return async function(dispatch){
      try {
        return dispatch({
          type: ADD_PRODUCT,
          payload: response.data.product
        })
      } catch (error) {
        console.error('Error al agregar el producto',error)
        dispatch({type: ADD_PRODUCT, payload:error})
      }
    }
  }

export default addProduct;  