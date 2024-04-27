import axios from "axios";
import { GET_PRODUCT_BY_NAME } from "../actions-types";

const URL = 'https://pinkpanther-backend-ip0f.onrender.com/product'

export const getProductByName = (name) => {
    return async function (dispatch){
        try {
            
            let response = await axios.get(`${URL}?name=${name}`)
            return dispatch({
              type:GET_PRODUCT_BY_NAME,
              payload: response.data
            })

        } catch (error) {
            console.error('Error al obtener el producto por nombre', error);
            dispatch({ type: GET_PRODUCT_BY_NAME, payload: error });
        }
    }
}

export default getProductByName;