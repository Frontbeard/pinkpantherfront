import { SELECT_CATEGORY } from "../actions-types";

export const selectCategory = (categoryId) => ({
  type: SELECT_CATEGORY,
  payload: categoryId,
});

export default selectCategory;
