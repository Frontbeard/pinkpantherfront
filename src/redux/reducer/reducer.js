import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_ALL_CATEGORIES,
  SET_SELECTED_CATEGORY,
} from '../actions/actions-types';

const initialState = {
  product: [],
  allproducts: [],
  details: [],
  categories: [],
  selectedCategory: null,
 
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
      // Actualiza todos los productos al recibir la lista completa desde el backend
      return {
        ...state,
        allproducts: payload,
        product: payload, // También actualiza los productos mostrados en la vista
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        details: payload,
      };

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload, // Actualiza la categoría seleccionada
      };
      case SET_SELECTED_CATEGORY:
        return {
          ...state,
          selectedCategory: action.categoryId,
          product: state.allproducts.filter(product => product.idCategory === action.categoryId),
        };
      

      


    default:
      return state;
  }
};

export default rootReducer;
