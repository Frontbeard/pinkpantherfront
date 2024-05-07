import { SAVE_FILTERS } from "../actions-types";

const saveFilters = (filters) => {
  return {
    type: SAVE_FILTERS,
    payload: filters
  };
};

export default saveFilters;
