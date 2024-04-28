import axios from "axios";
import { GET_CATEGORIES } from "../actions-types";

const URL = 'https://pinkpanther-backend-ip0f.onrender.com/categories'

const getAllCategories =()=>{
    return async (dispatch)=>{
        try {
            let response = await axios.get(`${URL}`)
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
