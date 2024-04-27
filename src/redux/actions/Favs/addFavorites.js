import axios from "axios";
import { ADD_FAVS } from "../actions-types";

const URL = 'https://pinkpanther-backend-ip0f.onrender.com/favorite/add/'

// export const addFavorites =()=>{
//        return async function(dispatch){
//          try {
//            return dispatch({
//              type: ADD_FAVS,
//              payload: response.data.product
//            })
//          } catch (error) {
//            console.error('Error al agregar favorito en el producto',error)
//            dispatch({type: ADD_FAVS, payload:error})
//          }
//        }
//      }

export default addFavorites;