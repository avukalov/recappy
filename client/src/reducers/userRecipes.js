import {
    USER_RECIPES,
    USER_FAVORITES,
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
      default:
        return state;
    }
  }
  