import api from '../utils/api';

import {
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAIL,
    UPDATE_RECIPE,
    RECIPE_ACTION,
    UPDATE_RECIPE_FAIL,
} from './types';


export const createRecipe = (recipe) => async(dispatch) => {
    try {
      // await api.post('/recipe/image', image)
      //       .then(res => {
              // const image_url = `http://localhost:3001/api/recipe/image/${res.data._id}`;
              // recipe.image = image_url;       
              const createdRecipe = api.post('/recipe/create', recipe)
                                      .then(res => {
                                        console.log("recipe added!");
      
      dispatch({ type: CREATE_RECIPE_SUCCESS, payload: createdRecipe })
                                      })
    } catch(err){
      dispatch({ type: CREATE_RECIPE_FAIL })
    }
}

export const setRecipe = (type, payload) => dispatch => {
    dispatch({ type, payload });
}

export const updateRecipe = (recipe) => async (dispatch) => {
  try {
    await api.put('/recipe/update', recipe)
            .then(res => {
              dispatch({ type: UPDATE_RECIPE, payload: res.data });
      })} catch(err) {
        dispatch({ type: UPDATE_RECIPE_FAIL })
    }
}