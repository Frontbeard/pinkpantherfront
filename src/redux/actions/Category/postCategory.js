 import axios from "axios";
 import { POST_CATEGORIES } from "../actions-types";

 const URL = 'https://pinkpanther-backend-ip0f.onrender.com/categories'

 export const postCategory=(category)=>{
     return async(dispatch)=>{
         try {
             const {data}= await axios.post(`${URL}`,category)
             return dispatch({
                type: POST_CATEGORIES,
                payload:data
             })
         } catch (error) {
            console.log(error)
         }
     }
 }