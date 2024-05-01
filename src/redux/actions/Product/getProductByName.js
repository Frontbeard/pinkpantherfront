import axios from "axios";
import { GET_PRODUCT_BY_NAME, GET_ALL_PRODUCTS } from "../actions-types"; // Asumiendo que tienes una acción GET_ALL_PRODUCTS definida en actions-types.js
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/product';

export const getProductByName = (name) => {
    return async function (dispatch){
        try {            
            let response = await axios.get(`${URL_LINK}/product?name=${name}`);
            //let response = await axios.get(`${URL}?name=${name}`);
            return dispatch({
                type: GET_PRODUCT_BY_NAME,
                payload: response.data
            });
        } catch (error) {
            console.error('Error al obtener el producto por nombre', error);
            dispatch({ type: GET_PRODUCT_BY_NAME, payload: error });
        }
    };
};

export const getAllProducts = () => {
    return async function (dispatch){
        try {
            let response = await axios.get(URL);
            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: response.data
            });
        } catch (error) {
            console.error('Error al obtener todos los productos', error);
            dispatch({ type: GET_ALL_PRODUCTS, payload: error });
        }
    };
};

export default getProductByName;
