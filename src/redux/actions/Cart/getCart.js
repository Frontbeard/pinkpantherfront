import axios from "axios";
import { GET_CART } from "../actions-types";
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/'

export const getCart =(id)=>{
    return async(dispatch)=>{
        try {
            const response = await axios.get(`${URL_LINK}/cart/${id}`)
            //const response = await axios.get(`${URL}/cart/${id}`)
            dispatch({
                type:GET_CART,
                payload: response.data.allCart
            })
        } catch (error) {
            console.error('Error los productos del carrito', error);
        }
    }
}

export default getCart;