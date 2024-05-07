import axios from "axios";
import { GET_CART } from "../actions-types";
import { URL_LINK } from '../../../URL.js'
//const URL = 'https://pinkpanther-backend-ip0f.onrender.com/'

export const getCart =()=>{
    //console.log()
    return {
      type: GET_CART, 
      //payload: ,
    };
    }
    
    export default getCart;


// export const getCart =()=>{
// //     return async(dispatch)=>{
// //         try {
// //             const response = await axios.get(`${URL_LINK}/cart/${id}`)
// //             //const response = await axios.get(`${URL}/cart/${id}`)
// //             dispatch({
// //                 type:GET_CART,
// //                 payload: response.data.allCart
// //             })
// //         } catch (error) {
// //             console.error('Error los productos del carrito', error);
// //         }
// //     }
// // }

// return async function (dispatch) {
//     try {
//        let response = await axios.get(`${URL_LINK}/cart/`)
//        //let response = await axios.get(`${URL}`);
//        return dispatch({
//            type: GET_CART,
//            payload: response.data
//        })

//     } catch (error) {
//        console.error('Error al obtener todos los productos', error);
//        dispatch({ type: GET_CART, payload: error });
//     }
//    }
// }

// export default getCart;