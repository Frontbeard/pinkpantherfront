import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  FILTER_PRODUCT,
  GET_PRODUCT_BY_ID

} from '../actions/actions-types';

const initialstate = {
  product: [],
  allproducts: [],
  details: []
  
  
}

const rootReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_ALL_PRODUCTS:
      if (state.product.length > 0) { // Comprueba si ya hay productos en el estado
        return {
          product: state.product, // Mantiene los productos existentes
          allproducts: state.allproducts // Mantiene todos los productos
        };
      }
      // Si no hay productos, actualiza tanto los productos como todos los productos con el payload de la acción
      return {
        ...state,
        allproducts: payload,
        product: payload
      };
     
      case GET_PRODUCT_BY_ID: 
      return {
         ...state,
         details: payload,
     };

     case ADD_PRODUCT:
      return {
        ...state,
        product: [...state.product, payload],// Agrega el nuevo producto al estado
        allproducts: [...state.allproducts, payload]// Agrega el nuevo producto a la lista completa de productos
      }




    default:
      return state; 
  }


  
};

export default rootReducer;

  
