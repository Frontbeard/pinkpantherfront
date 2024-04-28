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
  CHANGE_PAGE,
} from '../actions/actions-types';

const initialState = {
  // Paginación
  currentPage: 1,
  totalPages: 1, // Se debe actualizar cuando obtengas el total de páginas desde tu fuente de datos

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
    //products
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allproducts: payload,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        details: payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product: [...state.product, action.payload],
        allproducts: [...state.allproducts, action.payload]
      };
    case UPDATE_PRODUCT:
      const updatedProduct = state.product.map(prod => {
        if (prod.id === payload.id) {
          return payload;
        } else {
          return prod;
        }
      });
      return {
        ...state,
        product: updatedProduct,
        allproducts: updatedProduct
      };
    case GET_PRODUCT_BY_NAME:
      if (payload.length === 0) {
        console.log("Producto no encontrado");
        return state;
      } else {
        return {
          ...state,
          allproducts: payload,
        };
      }
    //favs
    case ADD_FAVS:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case DELETE_FAV:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload.id)
      };
    case GET_FAVORITES_BY_ID:
      return {
        ...state,
        favorites: action.payload
      };
    //cart
    case GET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case CLEAN_CART:
      return {
        ...state,
        cart: [],
      };
    case CLEAN_CART_REDUCER:
      return {
        ...state,
        cart: action.payload
      };
    case ADDING_PRODUCT:
      if (!state.cart.length) {
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
            
            return {
              ...state,
              cart: [...state.cart, action.payload],
            };
          } else {
            let productFound = state.cart.find(
              (prod) =>
                prod.name === action.payload.name &&
                prod.size === action.payload.size
            );
            productFound.quantity += action.payload.quantity;
            product: updatedProduct;
            allproducts: updatedProduct;
          }
        }
      }
    case REMOVING_PRODUCT:
      let productRemoved = state.cart[action.payload];
      return {
        ...state,
        cart: state.cart.filter((prod) => prod !== productRemoved)
      };
    case INCREMENT_QUANTITY:
      let product = state.cart[action.payload];
      if(product.quantity > 1){
        product.quantity = product.quantity -1;
        return {
          ...state,
          cart: [...state.cart]
        };
      } else {
        let product = state.cart[action.payload];
        return{
          ...state,
          cart: state.cart.filter((prod) => prod !== product)
        };
      }
    //category
    case GET_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case POST_CATEGORIES:
      return {
        ...state,
        allCategories: [...state.allCategories, action.payload]
      }; 
    case EDIT_CATEGORY:
      const updatedCategory = state.allCategories.map((category) => {
        if (category.id === payload.id) {
          return payload;
        }
        return category;
      });
      return {
        ...state,
        allCategories: updatedCategory,
      };
    // Paginación
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

