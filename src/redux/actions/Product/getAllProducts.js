import axios from "axios";
import { GET_ALL_PRODUCTS } from "../actions-types";
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/product'

export const getAllProducts = () => {
    return async function (dispatch) {
     try {
        let response = await axios.get(`${URL_LINK}/product`);
        //let response = await axios.get(`${URL}`);
        return dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response.data
        })

     } catch (error) {
        console.error('Error al obtener todos los productos', error);
        dispatch({ type: GET_ALL_PRODUCTS, payload: error });
     }
    }
}

export default getAllProducts;