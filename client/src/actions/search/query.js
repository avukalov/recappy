export const updateQuery = (type, value) => (dispatch) => {
  dispatch({ type, payload: value });
};

export const updatePager = (type, value) => (dispatch) => {
  dispatch({ type, payload: value });
};
