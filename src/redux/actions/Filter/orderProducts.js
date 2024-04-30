// orderProducts.js

import { ORDER } from "../actions-types";

export const orderProducts = (orderCriteria) => {
  return {
    type: ORDER,
    payload: orderCriteria // Utiliza orderCriteria en lugar de criteria
  };
};


export default orderProducts;
