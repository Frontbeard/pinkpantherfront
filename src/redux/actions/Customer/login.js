import axios from "axios";
import { LOGIN_SUCCESS } from "../actions-types";
import { URL_LINK } from '../../../URL.js'

const login = (data) => {
    //console.log(data.data.customer)
    return {
      type: LOGIN_SUCCESS,
      //payload: data.data.customer,
      payload: data.data.customer,
    };
  };

export default login;

// const login = (firebaseUid) => {
//     return async function (dispatch){
//         try {            
//             let response = await axios.get(`${URL_LINK}/customer/${firebaseUid}`);
//             //let response = await axios.get(`${URL}?name=${name}`);
//             if (response.data.customer) {
//                 // Dispatch LOGIN_SUCCESS action with the customer data
//                 dispatch({
//                     type: LOGIN_SUCCESS,
//                     payload: response.data.customer,
//                 });
//             } else {
//                 // If customer not found, dispatch error action
//                 dispatch({ 
//                     type: ERROR, 
//                     payload: { message: "Customer not found" } 
//                 });
//             }
//         } catch (error) {
//             console.error('Error al obtener la informacion del usuario', error);
//             dispatch({ type: ERROR, payload: error });
//         }
//     };
// };

// export default login;