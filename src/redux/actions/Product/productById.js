import axios from "axios"
import { GET_PRODUCT_BY_ID } from "../actions-types"
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/product'

export const productbyID = (id) => {

    return async function (dispatch) {
     try {
         let response = await axios.get(`${URL_LINK}/product/${id}`)
         //let response = await axios.get(`${URL}/${id}`)
         return dispatch ({
             type: GET_PRODUCT_BY_ID,
             payload: response.data
         })
     } catch (error) {
         console.error('Error al obtener el producto por id', error);
         dispatch({ type: GET_PRODUCT_BY_ID, payload: error });
     }
    }
 
 
 }

 export default productbyID;