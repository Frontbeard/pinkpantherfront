import axios from "axios";
import { GET_ALL_USERS } from "../actions-types";
import { URL_LINK } from "../../../URL";

const getAllUsers = (accessToken) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
      const response = await axios.get(`${URL_LINK}/user/allUsers`, config);
      return dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
    
      });
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };
};

export default getAllUsers;