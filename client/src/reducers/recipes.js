import {
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAIL,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_FAIL,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAIL,
    RESET_RECIPE,
    TITLE,
    SERVINGS,
    READY_IN_MINUTES,
    VERY_HEALTHY,
    IMAGE,
    IMAGE_URL,
    INGREDIENT_AMOUNT,
    INGREDIENT_UNIT,
    INGREDIENT_NAME,
    EXTENDED_INGREDIENTS,
    INGREDIENTS,
    INSTRUCTIONS,
    OCCASIONS,
    CUISINES,
    DISH_TYPES,
    DIETS,
    ADD_REMOVE_INSTRUCTIONS,
} from '../actions/types';

import logo from '../shared/images/recipe-default.png';

const initialState = {
    recipeImageURL: logo,
    recipe: {
        title: '',
        servings: 1,
        readyInMinutes: 0,
        veryHealthy: "false",
        image: null,
        extendedIngredients: [
            { name: '', amount: '', unit: '' }
        ],
        ingredients: [],
        instructions: [''],
        cuisines: [],
        dishTypes: [],
        diets: [],
        occasions: [],
        user: {
            id: '',
            firstName: '',
            lastName: '',
            email: ''
        }
    }
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    
  
    switch (type) {
      case CREATE_RECIPE_SUCCESS:
        return {
          ...state,
          recipe: initialState.recipe
        };
      case CREATE_RECIPE_FAIL:
          return initialState;
      // case UPDATE_RECIPE_SUCCESS:
      //   return {
      //     recipe: payload
      //   };
      // case DELETE_RECIPE_SUCCESS:
      //   return {
      //     recipe: initialState.recipe
      //   }
      case TITLE:
        return {
          ...state,
          recipe: {
              ...state.recipe,
              title: payload
          }
        };
      case SERVINGS:
        return {
          ...state,
          recipe: {
              ...state.recipe,
              servings: state.recipe.servings + payload
          }
        };
      case READY_IN_MINUTES:
          return {
            ...state,
            recipe: {
                ...state.recipe,
                readyInMinutes: payload ? parseInt(payload) : ''
          }
        };
      case VERY_HEALTHY:
        return {
          ...state,
          recipe: {
              ...state.recipe,
              veryHealthy: payload
          }
        };
      case IMAGE:
          return {
            ...state,
            recipe: {
                ...state.recipe,
                image: payload
          }
        };
      case IMAGE_URL:
          return {
            ...state,
            recipeImageURL: payload
          }
      case INGREDIENTS:
        let ingredients = [...state.recipe.ingredients];
        ingredients[payload.id] = payload.value;
        return {
          ...state,
          recipe: {
              ...state.recipe,
              ingredients
          }
        };
      case EXTENDED_INGREDIENTS:
          return {
            ...state,
            recipe: {
                ...state.recipe,
                extendedIngredients: payload
            }
          };
      case INGREDIENT_AMOUNT:
          let extendedIngredientsAmount = [...state.recipe.extendedIngredients];
          extendedIngredientsAmount[payload.id].amount = payload.value ? parseInt(payload.value) : '';
          return {
            ...state,
            recipe: {
                ...state.recipe,
                extendedIngredients: extendedIngredientsAmount
            }
        };
      case INGREDIENT_UNIT:
          let extendedIngredientsUnit = [...state.recipe.extendedIngredients];
          extendedIngredientsUnit[payload.id].unit = payload.value;
          return {
            ...state,
            recipe: {
                ...state.recipe,
                extendedIngredients: extendedIngredientsUnit
            }
        };
      case INGREDIENT_NAME:
          let extendedIngredientsName = [...state.recipe.extendedIngredients];
          extendedIngredientsName[payload.id].name = payload.value;
          return {
            ...state,
            recipe: {
                ...state.recipe,
                extendedIngredients: extendedIngredientsName
            }
        };
      case INSTRUCTIONS:
          let instructions = [...state.recipe.instructions];
          instructions[payload.id] = payload.value;
          return {
            ...state,
            recipe: {
                ...state.recipe,
                instructions
          }
        };
      case ADD_REMOVE_INSTRUCTIONS:
          return {
            ...state,
            recipe: {
                ...state.recipe,
                instructions: payload
            }
          }
      case OCCASIONS:
        return {
          ...state,
          recipe: {
              ...state.recipe,
              occasions: payload
          }
        };
      case DISH_TYPES:
          return {
            ...state,
            recipe: {
                ...state.recipe,
                dishTypes: payload
          }
        };
      case CUISINES:
          return {
            ...state,
            recipe: {
                ...state.recipe,
                cuisines: payload
          }
        };
      case DIETS:
        return {
          ...state,
          recipe: {
              ...state.recipe,
              diets: payload
          }
        };
      case RESET_RECIPE:
        return initialState;
    
      default:
        return state;
    }
  }
  