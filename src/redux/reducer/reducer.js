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
  CREATE_CART,
  CLEAR_CART,
  GET_CART,
  ADD_CART,
  REMOVE_CART,

  INCREMENT_QUANTITY,
  //category
  GET_CATEGORIES,
  POST_CATEGORIES,
  EDIT_CATEGORY,
  SELECT_CATEGORY,
  //filtro
  FILT_BY_CATEGORY,
  FILT_BY_SIZE,
  SAVE_FILTERS,
  ORDER,
  FILT_BY_PRICE,
  GET_CATEGORIES_BY_ID,
  //ERROR
  ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,

  //order
  GET_ORDERS,
  GET_ORDERID,
  GET_ORDERS_ID,
  // CHANGE_PAGE,
} from "../actions/actions-types";

const initialState = {
  //products
  product: [],
  allproducts: [],
  allProductsAdmin: [],
  allUsers: [],
  details: [],
  name: null,
  saveProducts: [],
  allCategories: [],
  //users
  isLoggedIn: false,
  userId: [],
  user: [],
  userData: [],
  token: [],
  email: "",
  //category
  saveFilters: {
    category: [],
    selectSize: "",
    selectPrice: "",
    selectCategory: "",
    selectOrdered: "",
  },
  //cart
  cart: null,
  //orders
  allOrders: [],
  ordersUser: [],
  favorites: [],
  shippingType: null,
  shippingCost: null,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    //products
    case GET_ALL_PRODUCTS:
      const activeProducts = payload && payload.filter(
        (product) => product.enable === true
      )
      return {
        ...state,
        allproducts: activeProducts,
        allProductsAdmin: action.payload,
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
        allproducts: [...state.allproducts, action.payload],
      };
    case UPDATE_PRODUCT:
     const filteredProds = [...state.allProductsAdmin.filter(
        (product) => product.id !== payload.id
      )]
      return {
        ...state,
        allproducts: [...state.allproducts],
        allProductsAdmin: [...filteredProds, payload]
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
        favorites: state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        ),
      };
    case GET_FAVORITES_BY_ID:
      return {
        ...state,
        favorites: action.payload,
      };
    //cart
    case CREATE_CART:
      const newCart = payload
      localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };
      case CLEAR_CART:
        localStorage.removeItem('cart');
        return {
          ...state,
          cart: null,
        };
    case GET_CART:
      const getCart = JSON.parse(localStorage.getItem('cart'))
      return {
        ...state,
        cart: getCart,
      };
    case ADD_CART:
      //const newCartAdd = [...state.cart, ...payload];
      const newCartAdd = state.cart.concat(payload);
      localStorage.setItem('cart', JSON.stringify(newCartAdd));
      return {
        ...state,
        cart: newCartAdd,
      };
    case REMOVE_CART:
      const newCartRemove = state.cart.filter(item => !payload.includes(item));
      localStorage.setItem('cart', JSON.stringify(newCartRemove));
      return {
        ...state,
        cart: newCartRemove,
      };
    case INCREMENT_QUANTITY:
      let product = state.cart[action.payload];
      if (product.quantity > 1) {
        product.quantity = product.quantity - 1;
        return {
          ...state,
          cart: [...state.cart],
        };
      } else {
        let product = state.cart[action.payload];
        return {
          ...state,
          cart: state.cart.filter((prod) => prod !== product),
        };
      }

    //category
    case GET_CATEGORIES:
      return {
        ...state,
        allCategories: payload,
      };
    case POST_CATEGORIES:
      return {
        ...state,
        allCategories: [...state.allCategories, action.payload],
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

    case GET_CATEGORIES_BY_ID:
      return {
        ...state,
        allCategories: payload,
      };
    case SELECT_CATEGORY:
      const selectedCategoryId = action.payload;
      const selectedCategory = state.allCategories.find(
        (category) => category.id === selectedCategoryId
      );
      const filteredProducts = selectedCategory
        ? selectedCategory.products
        : [];
      return {
        ...state,
        selectedCategory: selectedCategoryId,
        filteredProducts: filteredProducts,
      };

    // Paginación
    // case CHANGE_PAGE:
    //   return {
    //    ...state,
    //    currentPage: action.payload,
    //   };

    // Filtrar por categoría
    case FILT_BY_CATEGORY:
      const filteredByCategory = state.allproducts.filter(
        (product) => product.category === payload
      );
      return {
        ...state,
        allproducts: filteredByCategory,
      };

    // Filtrar por precio
    case FILT_BY_PRICE:
      const filteredByPrice = state.allproducts.filter(
        (product) => product.price <= payload
      );
      return {
        ...state,
        allproducts: filteredByPrice,
      };

    // Filtrar por tamaño
    case FILT_BY_SIZE:
      const filteredBySize = state.allproducts.filter(
        (product) => product.size === payload
      );
      return {
        ...state,
        allproducts: filteredBySize,
      };

    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };
    case GET_ORDERID:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.accessToken,
        user: action.payload,
      };

    case GET_ORDERS_ID:
      return {
        ...state,
        ordersUser: action.payload,
      };

    //actualiza el estado para indicar que el usuario cerro sesión
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        userId: null, // o cualquier otro valor predeterminado que quieras establecer
        accessToken: null, // También podría ser necesario eliminar el token de acceso
        user: null, // Restablecer el usuario a null
      };

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case SAVE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case LOGIN_SUCCESS:
      console.log("User data:", payload);
      return {
        ...state,
        isLoggedIn: true,
        // userId: payload.idfirebase, // o cualquier otro valor predeterminado que quieras establecer
        userData: payload,
      };

    case LOGOUT_SUCCESS:
      console.log("User data:", payload);
      localStorage.removeItem('cart');
      return {
        ...state,
        isLoggedIn: false,
        // userId: payload.idfirebase, // o cualquier otro valor predeterminado que quieras establecer
        userData: null,
      };

    case ERROR:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
