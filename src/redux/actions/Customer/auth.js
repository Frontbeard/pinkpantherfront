import axios from "axios";
import { AUTH_SUCCESS } from "../actions-types";
import { URL_LINK } from '../../../URL.js'

const auth = (data) => {
    console.log(data.customer)
    return {
      type: AUTH_SUCCESS,
      //payload: data.data.customer,
      payload: data.customer,
    };
  };

export default auth;