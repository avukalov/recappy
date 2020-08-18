import {
  SUBMIT,
  FETCH_SEARCH_QUERY,
  UPDATE_SEARCH_RESULTS,
  UPDATE_CURRENT_RECIPE,
  NO_SEARCH_RESULTS,
} from '../../actions/types';

const initialState = {
  recipes: [],
  currentRecipe: null,
  loading: false,
  submit: false,
  init: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBMIT:
      return {
        ...state,
        submit: true,
      };
    case FETCH_SEARCH_QUERY:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        recipes: payload,
        loading: false,
        init: false,
        submit: false,
      };
    case UPDATE_CURRENT_RECIPE:
      return {
        ...state,
        currentRecipe: payload,
      };
    case NO_SEARCH_RESULTS:
      return (state = initialState);
    default:
      return state;
  }
}
