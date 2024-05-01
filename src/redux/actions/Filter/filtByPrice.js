import { FILT_BY_PRICE } from "../actions-types";

// Acción para filtrar productos por precio
export const filtByPrice = (minPrice, maxPrice) => {
  return {
    type: FILT_BY_PRICE,
    payload: { minPrice, maxPrice }
  };
};

export default filtByPrice;
