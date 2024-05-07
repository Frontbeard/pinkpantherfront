import { LOGOUT_SUCCESS } from "../actions-types";

const logout = () => {
    return {
      type: LOGOUT_SUCCESS,
      //payload: firebaseUid,
    };
  };

  export default logout;