import { CLEAN_CART_REDUCER } from "../actions-types";

const cleanCartReducer =()=>{
    return{
        type:CLEAN_CART_REDUCER,
        payload: []
    }
}

export default cleanCartReducer;