import axios from "axios";
import { GET_PRODUCT_BY_NAME } from "../actions-types";

const URL = 'https://pinkpanther-backend-ip0f.onrender.com/product';

export const getProductByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}?name=${name}`);
            dispatch({
              type: GET_PRODUCT_BY_NAME,
              payload: data
            });
        } catch (error) {
            console.error('Error al obtener el producto por nombre', error);
             dispatch({ type: "ERROR_OCCURRED", payload: error.message });
        }
    }
};

export default getProductByName;