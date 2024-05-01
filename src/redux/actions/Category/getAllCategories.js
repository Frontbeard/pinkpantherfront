import axios from "axios";
import { GET_CATEGORIES } from "../actions-types";
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/categories'

const getAllCategories =()=>{
    return async (dispatch)=>{
        try {
            let response = await axios.get(`${URL}`)
            console.log(response, 'actions de allcategories');

            return dispatch({
                type: GET_CATEGORIES,
                payload:response.data,
            })
        } catch (error) {
            console.error('Error al obtener todas las categorias', error)
        }
    }
}

export default getAllCategories;
