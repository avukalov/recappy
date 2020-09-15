import {
    USER_RECIPES,
    USER_FAVORITES,
    DELETE_RECIPE,
    IS_EMPTY_FAVORITES,
} from '../actions/types';


const initialState = {
  recipes: [],
  favorites: {},
  emptyFavorites: true
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
      case DELETE_RECIPE:
        return {
          ...state,
          recipes: payload
        }
      case IS_EMPTY_FAVORITES:
        return {
          ...state,
          emptyFavorites: payload
        }
      default:
        return state;
    }
}


  