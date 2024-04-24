import axios from 'axios';

import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_NAME,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    FILTER_PRODUCT

} from './actions-types';

// const URL = 'https://pinkpanther-backend-ip0f.onrender.com/';
const URL = 'http://localhost:3001';


export const allproduct = () => {
    return async function (dispatch) {
     try {
        let response = await axios.get(`${URL}/product`);

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

export const productbyID = (id) => {

   return async function (dispatch) {
    try {
        let response = await axios.get(`${URL}/product/${id}`)
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


export const productbyname = () => {
    return async function (dispatch){
        try {
            
            let response = await axios.get(`${URL}/`)

        } catch (error) {
            console.error('Error al obtener el producto por nombre', error);
            dispatch({ type: GET_PRODUCT_BY_NAME, payload: error });
        }
    }
}