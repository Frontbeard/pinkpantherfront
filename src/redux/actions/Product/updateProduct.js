import axios from "axios";
import { UPDATE_PRODUCT } from "../actions-types";
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/product';

export const updateProduct = (productId,newData)=>{
    return async (dispatch)=>{
      try {
        const response = await axios.put(`${URL_LINK}/product/${productId}`, newData)
        //const response = await axios.put(`${URL}/${productId}`, newData)
        console.log("RESPONSE.DATA.PRODUCT", response.data.product)
        dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data.product
        })
        
      } catch (error) {
        console.error("Error al editar el producto", error)
      }
    }
  
  }

 
