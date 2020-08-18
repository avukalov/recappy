import {
  FETCH_FILTERS,
  UPDATE_FILTERS,
  RESET_FILTERS,
} from '../../actions/types';

const initialState = {
  filters: {
    includedIngredients: [],
    excludedIngredients: [],
    cuisines: [],
    dishTypes: [],
    diets: [],
    occasions: [],
  },
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_FILTERS:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: payload,
        loading: false,
      };
    case RESET_FILTERS:
      return (state = initialState);
    default:
      return state;
  }
}
