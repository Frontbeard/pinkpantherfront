import axios from "axios";
import { GET_ALL_USERS } from "../actions-types";
import { URL_LINK } from "../../../URL";

const getAllUsers = () => {
  return async (dispatch)=>{
    try {
        let response = await axios.get(`${URL_LINK}/customer`)
        return dispatch({
            type: GET_ALL_USERS,
            payload:response.data,
        })
    } catch (error) {
        console.error('Error al obtener todas las categorias', error)
    }
}
}

export default getAllUsers;