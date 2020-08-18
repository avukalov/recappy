import { SUBMIT, RESET_SEARCH_QUERY } from '../types';

export const setQuery = (type, payload) => (dispatch) => {
  dispatch({ type, payload });
  if (type === RESET_SEARCH_QUERY) {
    dispatch({ type: SUBMIT });
  }
};

export const setPager = (type, payload) => (dispatch) => {
  dispatch({ type, payload });
  dispatch({ type: SUBMIT });
};
