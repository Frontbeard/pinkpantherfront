import axios from "axios";
import { UPDATE_PRODUCT } from "../actions-types";
import { URL_LINK } from '../../../URL.js'

export const updateProduct = (productId,newData)=>{
    return async (dispatch)=>{
      try {
        const response = await axios.put(`${URL_LINK}/product/${productId}`, newData)
        dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data.product
        })
        
      } catch (error) {
        console.error("Error al editar el producto", error)
      }
    }
  
  }

 
