import axios from "axios";
import { CLEAN_CART } from "../actions-types";

const URL = 'https://pinkpanther-backend-ip0f.onrender.com/cart'


export const deleteCart =(id)=>{
    return async(dispatch)=>{
        try {
            const response = await axios.delete(`${URL}/${id}`)
            if(!response.ok){
                throw new Error('Error al eliminar carrito')
            }
            dispatch({
                type:CLEAN_CART,
                payload:id,
            })
            
        } catch (error) {
            console.error('Error al borrar el carrito:', error)
        }
    }

}