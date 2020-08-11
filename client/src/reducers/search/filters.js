import { SET_FILTERS, RESET_FILTERS } from '../../actions/types';

const initialState = {
  includedIngredients: [],
  excludedIngredients: [],
  cuisines: [],
  dishTypes: [],
  diets: [],
  occasions: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FILTERS:
      return {
        ...state,
        includedIngredients: payload.ingredients,
        excludedIngredients: payload.ingredients,
        cuisines: payload.cuisines,
        dishTypes: payload.dishTypes,
        diets: payload.diets,
        occasions: payload.occasions,
      };
    case RESET_FILTERS:
      return (state = initialState);
    default:
      return state;
  }
}
