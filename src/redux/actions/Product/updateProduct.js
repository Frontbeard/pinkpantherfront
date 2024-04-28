import axios from "axios";
import { UPDATE_PRODUCT } from "../actions-types";
const URL = 'https://pinkpanther-backend-ip0f.onrender.com/product';

export const editProduct = (productId,newData)=>{
    return async (dispatch)=>{
      try {
        const response = await axios.put(`${URL}/${productId}`, newData)
        const updatedProduct=response.data.product

        dispatch({
            type: UPDATE_PRODUCT,
            payload: updatedProduct
        })
        
      } catch (error) {
        console.error("Error al edir el producto", error)
      }
    }
  
  }

export default editProduct;  
