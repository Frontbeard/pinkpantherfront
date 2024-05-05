import axios from "axios";
import { URL_LINK } from "../../../URL.js";

const postReview = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL_LINK}/review`, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
export default postReview;
