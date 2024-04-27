import axios from "axios";
import { ADDING_PRODUCT } from "../actions-types";

const URL = 'https://pinkpanther-backend-ip0f.onrender.com/'

//revisar todavia

// export const addingProduct =({productQuantity, totalPrice,discounts} )=>{
//     return async dispatch =>{
//         try {
//             const response = await axios.post(`${URL}/cart`,{
//                 productQuantity,
//                 totalPrice,
//                 discounts
//             })
//             dispatch(response.data.cart)
//         } catch (error) {
//             dispatch(err)
            
//         }
//     }

// }
