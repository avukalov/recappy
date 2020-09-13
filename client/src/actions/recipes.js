import {
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAIL,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_FAIL,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAIL,
} from './types';
import api from '../utils/api';

export const createRecipe = (image, recipe) => async(dispatch) => {
    try {
      await api.post('/recipe/image', image)
            .then(res => {
              const image_url = `http://localhost:3001/api/recipe/image/${res.data._id}`;
              recipe.image = image_url;       
              const createdRecipe = api.post('/recipe/create', recipe)
                                      .then(res => console.log("recipe added!"));
      
      dispatch({ type: CREATE_RECIPE_SUCCESS, payload: createdRecipe })
      })  
    } catch(err){
      dispatch({ type: CREATE_RECIPE_FAIL })
    }
}

export const setRecipe = (type, payload) => dispatch => {
    dispatch({ type, payload });
}
