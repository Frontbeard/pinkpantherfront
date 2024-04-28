import {
  //products
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_BY_ID,
  //favs
  ADD_FAVS,
  DELETE_FAV,
  GET_FAVORITES_BY_ID,
  //users
  LOGIN_USER,
  LOGOUT_USER,
  USER_BY_ID,
  AUTH_USER,
  GET_ALL_USERS,
  SAVE_EMAIL,
  //cart
  ADDING_PRODUCT,
  CLEAN_CART,
  GET_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVING_PRODUCT,
  CLEAN_CART_REDUCER,
  //category
  GET_CATEGORIES,
  POST_CATEGORIES,
  EDIT_CATEGORY,
  //filtro
  FILT_BY_CATEGORY,
  FILT_BY_SIZE,
  SAVE_FILTERS,
  ORDER,

  

} from '../actions/actions-types';

const initialstate = {
  //products
  product: [],
  allproducts: [],
  details: [],
  name:null,
  saveProducts:[],
  allCategories: [],
  //favs
  favorites:[],
  //users
  isLoggedIn: false,
  userId: [],
  user: [],
  token: [],
  email: "",
  //category
  saveFilters:{
    category:[],
    selectSize:"",
    selectCategory:"",
    selectOrdered: "",   
  },
  //cart
  cart:[],
  



  
  
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
        allproducts: action.payload,
        product: action.payload
      };
     
      //detail del producto por id
      case GET_PRODUCT_BY_ID: 
      return {
         ...state,
         details: action.payload,
     };

     //agregar producto
     case ADD_PRODUCT:
      return {
        ...state,
        product: [...state.product, action.payload],// Agrega el nuevo producto al estado
        allproducts: [...state.allproducts, action.payload]// Agrega el nuevo producto a la lista completa de productos
      }

      //edita products
        case UPDATE_PRODUCT:
          const updatedProduct = state.product.map(prod=>{
            if(prod.id === payload.id){
              return payload;
            }else {
              return prod;
            }
          })

          return{
            ...state,
            product: updatedProduct,
            allproducts: updatedProduct
          }

        //obtener product por nombre
          case GET_PRODUCT_BY_NAME:
            return {
              ...state,
              allproducts: state.allproducts.filter(product => product.name.toLowerCase().includes(action.payload.toLowerCase()))
           };

           case ADD_FAVS:
            return{
              ...state,
              favorites: [...state.favorites, action.payload],
            }

           case DELETE_FAV:
            return{
              ...state,
              favorites: state.favorites.filter(fav=>fav.id !== action.payload.id)
            }
 
           // se actualiza el estado favorites del store con los datos de favoritos del usuario
           case GET_FAVORITES_BY_ID:
            return{
              ...state,
              favorites: action.payload
            }

            case GET_CART:
            return {
            ...state,
            cart: action.payload // Actualiza el estado del carrito 
            };

            //este elimina todos los productos del carrito y lo deja vacio
            case CLEAN_CART:
              return{
                ...state,
                cart: [],
              }

            //esta accion es para reemplazar el contenido, en vez de eliminar todo lo que tenga el carrito, permite mas flexibilidad para saber
            //que producto eliminar 
            case CLEAN_CART_REDUCER:
              return{
                ...state,
                cart:action.payload
              }  

              case FILT_BY_CATEGORY:
                return {
                  ...state,
                  allProducts:
                    action.payload === "TA"
                      ? state.saveProducts
                      : state.saveProducts.filter(
                          (product) => product.Category.name === action.payload
                        ),
          
                  savePivot: state.saveProducts.filter(
                    (product) => product.Category.name === action.payload
                  ),
                };

                case FILT_BY_SIZE:
                const size = payload;
                const filteredProductsBySize = state.allproducts.filter(product => {
                // Verifica si el talle está presente en la lista de tamaños del producto
                return product.size.includes(size);
               });

                return {
                ...state,
                   allproducts: filteredProductsBySize,
                  };
                
                case SAVE_FILTERS:
                 let newSaveFilters = {...state.saveFilters};

                 if(
                  state.saveFilters.category.length < action.payload.category.length ||
                  state.saveFilters.size.length < action.payload.size.length
                 ){
                  newSaveFilters=action.payload;
                 } else if (
                  action.payload.selectCategory ||
                  action.payload.selectSize ||
                  action.payload.selectOrdered
                 ){
                  newSaveFilters = {
                    ...newSaveFilters,
                    selectCategory:action.payload.selectCategory,
                    selectSize:action.payload.selectSize,
                    selectOrdered:action.payload.selectOrdered,
                  }
                 }

                 return {
                  ...state,
                  saveFilters: newSaveFilters
                 };

                 case GET_CATEGORIES:
                  return {
                    ...state,
                    allCategories: action.payload,
                  }

                 case POST_CATEGORIES:
                  return {
                    ...state,
                    allCategories: [...state.allCategories, action.payload]
                  } 

                  case EDIT_CATEGORY:
                  //busca la categoria en el estado y la actualiza con los datos nuevos
                  const updatedCategory = state.allCategories.map((category)=>{
                    if(category.id === payload.id){
                      return payload;// Utiliza los nuevos datos de la categoría
                    }
                    return category;// Mantiene las categorías que no están siendo editadas
                  })

                  return{
                    ...state,
                    allCategories:updatedCategory,
                  }





    default:
      return state; 
  }


  
};

export default rootReducer;

  
