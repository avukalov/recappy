import {
  FETCH_RECIPES,
  FETCH_MORE_RECIPES,
  SET_RECIPES,
  APPEND_RECIPES,
  NO_RESULTS,
} from '../../actions/types';

const initialState = {
  recipes: [],
  loading: false,
  loadingMore: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  const { recipes } = state;

  switch (type) {
    case FETCH_RECIPES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MORE_RECIPES:
      return {
        ...state,
        loadingMore: true,
      };
    case SET_RECIPES:
      return {
        ...state,
        recipes: payload,
        loading: false,
      };
    case APPEND_RECIPES:
      return {
        ...state,
        recipes: [...recipes, ...payload],
        loadingMore: false,
      };
    case NO_RESULTS:
      return (state = initialState);
    default:
      return state;
  }
}
