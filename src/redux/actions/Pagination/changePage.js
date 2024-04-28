import { CHANGE_PAGE } from '../actions-types';

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  payload: page,
});
