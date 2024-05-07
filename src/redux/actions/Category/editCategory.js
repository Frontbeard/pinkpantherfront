import axios from "axios";
import { EDIT_CATEGORY } from "../actions-types";
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/categories'

const editCategory = (categoryId, newData) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${URL_LINK}/categories/${categoryId}`, newData); //Para mi asi esta bien, le faltaba en la linea de abajo llamar al link
        //const response = await axios.put(`/${categoryId}`, newData);
        const updatedCategory = response.data;
        
        dispatch({
          type: EDIT_CATEGORY,
          payload: updatedCategory,
        });
      } catch (error) {
        console.error('Error al editar categora:', error);
      }
    };
  };
  
  export default editCategory;