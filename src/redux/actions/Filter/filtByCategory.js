import { FILT_BY_CATEGORY } from "../actions-types";

// Acción para filtrar productos por categoría
export const filtByCategory = (category) => {
  return {
    type: FILT_BY_CATEGORY,
    payload: category
  };
};

export default filtByCategory;