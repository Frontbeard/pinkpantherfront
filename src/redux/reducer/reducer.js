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
  FILT_BY_PRICE,
} from '../actions/actions-types';

const initialState = {
    //products
  product: [],
  allproducts: [],
  details: [],
  name: null,
  saveProducts: [],
  allCategories: [],
    //favs
  favorites: [],
    //users
  isLoggedIn: false,
  userId: [],
  user: [],
  token: [],
  email: "",
    //category
  saveFilters: {
    category: [],
    selectSize: "",
    selectPrice:"",
    selectCategory: "",
    selectOrdered: "",
  },
    
  //cart
  cart: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
      if (state.product.length > 0) {
        return {
          product: state.product,
          allproducts: state.allproducts,
        };
      }
      return {
        ...state,
        allproducts: action.payload,
        product: action.payload,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        details: action.payload,
      };
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
            if (payload.length === 0) {
              console.log("Producto no encontrado");
              return state; // Mantener el estado actual si no se encontraron productos
            } else {
              return {
                ...state,
                allproducts: payload,
              };
            } 

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
              case ADDING_PRODUCT:
                if (!state.cart.length) {
                  // console.log("no hay nada, guardo por primera vez");
                  return {
                    ...state,
                    cart: [action.payload],
                  };
                } else {
                  let productDontMatch = [];
          
                  productDontMatch = state.cart.filter(
                    (prod) =>
                      prod.name !== action.payload.name ||
                      prod.size !== action.payload.size
                  );
          
                  if (
                    productDontMatch.length &&
                    productDontMatch.length === state.cart.length
                  ) {
                    productDontMatch = [];
          
                    // console.log("es diferente, agrego como otro producto");
                    return {
                      ...state,
                      cart: [...state.cart, action.payload],
                    };
                  } else {
                    let productDontMatch = [];
          
                    productDontMatch = state.cart.filter(
                      (prod) =>
                        prod.name !== action.payload.name ||
                        prod.size !== action.payload.size
                    );
          
                    if (
                      productDontMatch.length &&
                      productDontMatch.length === state.cart.length
                    ) {
                      productDontMatch = [];
          
                      // console.log("es diferente, agrego como otro producto");
                      return {
                        ...state,
                        cart: [...state.cart, action.payload],
                      };
                    } else {
                      // console.log(
                      //   "ya existe el producto, lo encuentro y le sumo la cantidad"
                      // );
                      let productFound = state.cart.find(
                        (prod) =>
                          prod.name === action.payload.name &&
                          prod.size === action.payload.size
                      );
                      productFound.quantity += action.payload.quantity;
          
                      return {
                        ...state,
                        cart: [...state.cart],
                      };
                    }
                  }
                }
          

            case REMOVING_PRODUCT:
              let productRemoved=state.cart[action.payload]
              return {
                ...state,
                cart: state.cart.filter((prod)=> prod !==productRemoved)
              }
              
            case INCREMENT_QUANTITY:

            case DECREMENT_QUANTITY:
              let product = state.cart[action.payload]

              if(product.quantity > 1){
                product.quantity = product.quantity -1;
                return {
                  ...state,
                  cart: [...state.cart]
                }
              }else {
                let product = state.cart[action.payload]

                return{
                  ...state,
                  cart: state.cart.filter((prod)=> prod !==product)
                }
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

                case FILT_BY_PRICE:  
                const price= payload;
                const filteredProductsByPrice = state.allproducts.filter(prod=>{
                  return prod.price.includes(price)
                })

                return {
                  ...state,
                  allProducts:filteredProductsByPrice
                }
                
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
