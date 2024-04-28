import { 
  //products
 GET_ALL_PRODUCTS,
 GET_PRODUCT_BY_NAME,
 ADD_PRODUCT,
 UPDATE_PRODUCT,
 GET_PRODUCT_BY_ID,
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
       details: action.payload,
     };
   case ADD_PRODUCT:
     return {
       ...state,
       product: [...state.product, action.payload],
       allproducts: [...state.allproducts, action.payload],
     };
   case UPDATE_PRODUCT:
     const updatedProduct = state.product.map((prod) => {
       if (prod.id === payload.id) {
         return payload;
       } else {
         return prod;
       }
     });
     return {
       ...state,
       product: updatedProduct,
       allproducts: updatedProduct,
     };
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
     return {
       ...state,
       favorites: [...state.favorites, action.payload],
     };
   case DELETE_FAV:
     return {
       ...state,
       favorites: state.favorites.filter((fav) => fav.id !== action.payload.id),
     };
   case GET_FAVORITES_BY_ID:
     return {
       ...state,
       favorites: action.payload,
     };
   case GET_CART:
     return {
       ...state,
       cart: action.payload,
     };
   case CLEAN_CART:
     return {
       ...state,
       cart: [],
     };
   case CLEAN_CART_REDUCER:
     return {
       ...state,
       cart: action.payload,
     };
   case FILT_BY_CATEGORY:
     return {
       ...state,
       allProducts:
         action.payload === "TA"
           ? state.saveProducts
           : state.saveProducts.filter((product) => product.Category.name === action.payload),
       savePivot: state.saveProducts.filter((product) => product.Category.name === action.payload),
     };
   case FILT_BY_SIZE:
     const size = payload;
     const filteredProductsBySize = state.allproducts.filter((product) => {
       return product.size.includes(size);
     });
     return {
       ...state,
       allproducts: filteredProductsBySize,
     };
   case SAVE_FILTERS:
     let newSaveFilters = { ...state.saveFilters };
     if (
       state.saveFilters.category.length < action.payload.category.length ||
       state.saveFilters.size.length < action.payload.size.length
     ) {
       newSaveFilters = action.payload;
     } else if (action.payload.selectCategory || action.payload.selectSize || action.payload.selectOrdered) {
       newSaveFilters = {
         ...newSaveFilters,
         selectCategory: action.payload.selectCategory,
         selectSize: action.payload.selectSize,
         selectOrdered: action.payload.selectOrdered,
       };
     }
     return {
       ...state,
       saveFilters: newSaveFilters,
     };
   case GET_CATEGORIES:
     return {
       ...state,
       allCategories: action.payload,
     };
   case POST_CATEGORIES:
     return {
       ...state,
       allCategories: [...state.allCategories, action.payload],
     };
   case EDIT_CATEGORY:
     const updatedCategory = state.allCategories.map((category) => {
       if (category.id === payload.id) {
         return payload; // Utiliza los nuevos datos de la categoría
       }
       return category; // Mantiene las categorías que no están siendo editadas
     });
     return {
       ...state,
       allCategories: updatedCategory,
     };
   default:
     return state;
 }
};

export default rootReducer;
