import { GET_CATEGORIES_BY_ID } from "../actions-types";
import axios from "axios";
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/categories'



export const getCategoryById = (categoryId) => {
    return async function (dispatch) {
        try {
        let response = await axios.get(`${URL_LINK}/categories/${categoryId}`)
        //let response = await axios.get(`${URL}/${categoryId}`)
        return dispatch({
            type: GET_CATEGORIES_BY_ID,
            payload: response.data
        })

        } catch (error) {
            console.error('Error al obtener las categorias por id', error);
            dispatch({ type: GET_CATEGORIES_BY_ID, payload: error });
        }
    }
}