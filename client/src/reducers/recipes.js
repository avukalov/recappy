import {
    CREATE_RECIPE,
    UPDATE_RECIPE,
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
    RECIPE_ACTION,
} from '../actions/types';

const initialState = {
    action: 'Create',
    recipeImageURL: '',
    recipe: {
        title: '',
        servings: 1,
        readyInMinutes: '',
        veryHealthy: "false",
        image: '',
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
      case CREATE_RECIPE:
        return {
          ...state,
          recipe: initialState.recipe
        };
      case UPDATE_RECIPE:
        return {
          ...state,
          recipeImageURL: payload.image,
          recipe: {
            ...payload,
            veryHealthy: payload.veryHealthy.toString(),
          }
        };


      case RECIPE_ACTION:
        return {
          ...state,
          action: payload
        }  


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
        ingredients[payload.index] = payload.value;
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
          extendedIngredientsAmount[payload.index].amount = payload.value ? parseInt(payload.value) : '';
          return {
            ...state,
            recipe: {
                ...state.recipe,
                extendedIngredients: extendedIngredientsAmount
            }
        };
      case INGREDIENT_UNIT:
          let extendedIngredientsUnit = [...state.recipe.extendedIngredients];
          extendedIngredientsUnit[payload.index].unit = payload.value;
          return {
            ...state,
            recipe: {
                ...state.recipe,
                extendedIngredients: extendedIngredientsUnit
            }
        };
      case INGREDIENT_NAME:
          let extendedIngredientsName = [...state.recipe.extendedIngredients];
          extendedIngredientsName[payload.index].name = payload.value;
          return {
            ...state,
            recipe: {
                ...state.recipe,
                extendedIngredients: extendedIngredientsName
            }
        };
      case INSTRUCTIONS:
          let instructions = [...state.recipe.instructions];
          instructions[payload.index] = payload.value;
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
        return {
          action: 'Create',
          recipeImageURL: '',
          recipe: {
            ...initialState.recipe,
            extendedIngredients: [{ name: '', amount: '', unit: '' }],
            instructions: [''],
          }
        };
    
      default:
        return state;
    }
  }
  