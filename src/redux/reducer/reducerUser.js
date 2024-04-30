import { LOGIN_USER,SAVE_EMAIL,LOGOUT_USER } from "../actions/actions-types";

const initialState = {
    // usuario
    isLoggedIn: false,
    user: null,
    accessToken: null,
    email: "",
  };
  
  const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        // Actualiza el estado para indicar que el usuario inició sesion
      case LOGIN_USER:
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
          accessToken: action.accessToken,
        };

        //Actualiza el estado para indicar que el usuario cerro sesion
      case LOGOUT_USER:
        return {
          ...state,
          isLoggedIn: false,// Establece isLoggedIn en false y elimina la información del usuario. 
          user: null,
        };

        //Actualiza el estado con el correo electrónico proporcionado en la acción
      case SAVE_EMAIL:
        return {
          ...state,
          email: action.payload,
        }  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default reducerUser;