import axios from "axios";
import {  INCREMENT_QUANTITY} from "../actions-types";
import { URL_LINK } from '../../../URL.js'

export const incrementQuantity = (productId) => ({
    type: INCREMENT_QUANTITY,
    payload: productId
  });