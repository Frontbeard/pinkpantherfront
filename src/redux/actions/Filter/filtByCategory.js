import { FILT_BY_CATEGORY } from "../actions-types";

export const filtByCategory = (category) => {
    return {
      type: FILT_BY_CATEGORY,
      payload: category,
    };
  };