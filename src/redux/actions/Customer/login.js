import { LOGIN_SUCCESS } from "../actions-types";

const login = (firebaseUid) => {
    return {
      type: LOGIN_SUCCESS,
      payload: firebaseUid,
    };
  };

export default login;
