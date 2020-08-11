import { RESET_QUERY } from '../types';

export const updateQuery = (type, value) => (dispatch) => {
  if (type === RESET_QUERY) {
    dispatch({ type });
  } else {
    dispatch({ type, payload: value });
  }
};
