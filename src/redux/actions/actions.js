import axios from 'axios';

import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_NAME,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    FILTER_PRODUCT

} from './actions-types';

// const URL = 'https://pinkpanther-backend-ip0f.onrender.com/';
const URL = 'http://localhost:3001/product';


export const getAllProducts = () => {
    return async function (dispatch) {
     try {
        let response = await axios.get(`${URL}`);

        return dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response.data
        })

     } catch (error) {
        console.error('Error al obtener todos los productos', error);
        dispatch({ type: GET_ALL_PRODUCTS, payload: error });
     }
    }
}

export const productbyID = (id) => {

   return async function (dispatch) {
    try {
        let response = await axios.get(`${URL}/${id}`)
        return dispatch ({
            type: GET_PRODUCT_BY_ID,
            payload: response.data
        })
    } catch (error) {
        console.error('Error al obtener el producto por id', error);
        dispatch({ type: GET_PRODUCT_BY_ID, payload: error });
    }
   }


}


export const getProductByName = (name) => {
    return async function (dispatch){
        try {
            
            let response = await axios.get(`${URL}?name=${name}`)
            return dispatch({
              type:GET_PRODUCT_BY_NAME,
              payload: response.data
            })

        } catch (error) {
            console.error('Error al obtener el producto por nombre', error);
            dispatch({ type: GET_PRODUCT_BY_NAME, payload: error });
        }
    }
}

export const filterproduct =()=>{
  return async function (dispatch) {
    try{

    }catch(error){


    }
  }
}

export const addProduct =(product)=>{
  return async function(dispatch){
    try {
      const response = await axios.post(`${URL}/product`, productData)

      return dispatch({
        type: ADD_PRODUCT,
        payload: response.data.product
      })
    } catch (error) {
      console.error('Error al agregar el producto',error)
      dispatch({type: ADD_PRODUCT, payload:error})
    }
  }
}

export const filterProduct =(idCategory)=>{
  return async function (dispatch) {
    try {
        const response = await axios.get(`${URL}?categoryId=${idCategory}`);

        return dispatch({
            type: FILTER_PRODUCT,
            payload: response.data
        });
    } catch (error) {
        console.error('Error al filtrar productos por categoría', error);
        dispatch({ type: FILTER_PRODUCT, payload: error });
    }
}
}