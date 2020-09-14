import {
    USER_RECIPES,
    USER_FAVORITES,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAIL,
} from '../actions/types';


const initialState = {
  recipes: [],
  favorites: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case USER_RECIPES:
        return {
          ...state,
          recipes: payload
        };
      case USER_FAVORITES:
        return {
          ...state,
          favorites: payload
        };
      case DELETE_RECIPE_SUCCESS:
        return {
          ...state,
          recipes: payload
        }
      default:
        return state;
    }
  }
  