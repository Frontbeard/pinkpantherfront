import axios from "axios";
import { GET_FAVORITES_BY_ID } from "../actions-types";

const URL = 'https://pinkpanther-backend-ip0f.onrender.com/customer'

export const getFavorites = (customerId)=>{
    return async(dispatch)=>{
        try {
            const response = await axios.get(`${URL}/${customerId}/favorites`)
            if(!response.ok){
                throw new Error ('Failed to fetch favorites')
            }
            const favorites = await response.json()
            dispatch({
                type:GET_FAVORITES_BY_ID,
                payload:favorites
            })
        } catch (error) {
            console.error('Error al cargar los favoritos:', error);
        }
    }
}

export default getFavorites;