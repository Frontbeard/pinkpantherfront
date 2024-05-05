import axios from "axios";
import { URL_LINK } from "../../../URL.js";

const postReview = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL_LINK}/review`, payload);
      return {
        message: "Compra realizada correctamente",
      };
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
export default postReview;
