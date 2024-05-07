import axios from "axios";
import { UPDATE_USER } from "../actions-types";
import { URL_LINK } from '../../../URL.js'

export const updateUser = (user, newData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_LINK}/customer/${user.id}`, newData); 
      dispatch({
        type: UPDATE_USER,
        payload: response.data.user
      });
    } catch (error) {
      console.error("Error al editar el usuario", error);
    }
  };
};
