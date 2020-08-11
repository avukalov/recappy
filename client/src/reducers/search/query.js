import {
  TEXT,
  INCLUDED_INGREDIENTS,
  EXCLUDED_INGREDIENTS,
  CUISINES,
  DISH_TYPES,
  DIETS,
  OCCASIONS,
  // PRICE_PER_SERVING,
  // READY_IN_MINUTES,
  RESET_QUERY,
} from '../../actions/types';

const initialState = {
  text: null,
  includedIngredients: [],
  excludedIngredients: [],
  cuisines: [],
  dishTypes: [],
  diets: [],
  occasions: [],
  // pricePerServing: { min: 0, max: 1000 },
  // readyInMinutes: { min: 0, max: 1000 },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TEXT:
      return {
        ...state,
        text: payload,
      };
    case INCLUDED_INGREDIENTS:
      return {
        ...state,
        includedIngredients: payload,
      };
    case EXCLUDED_INGREDIENTS:
      return {
        ...state,
        excludedIngredients: payload,
      };
    case CUISINES:
      return {
        ...state,
        cuisines: payload,
      };
    case DISH_TYPES:
      return {
        ...state,
        dishTypes: payload,
      };
    case DIETS:
      return {
        ...state,
        diets: payload,
      };
    case OCCASIONS:
      return {
        ...state,
        occasions: payload,
      };
    case RESET_QUERY:
      return (state = initialState);
    default:
      return state;
  }
}
