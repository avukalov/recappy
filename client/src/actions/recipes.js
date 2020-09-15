import { getUserRecipes } from './userRecipes';
import api from '../utils/api';

import {
    CREATE_RECIPE,
    UPDATE_RECIPE,
    DELETE_RECIPE,
} from './types';


export const createRecipe = recipe => async(dispatch) => {
    try {
        await api.post('/recipe/create', recipe,{})
          .then(res => 
              dispatch({ type: CREATE_RECIPE, payload: res.data })
          )} 
      catch(err){
        console.log(err);
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
      })
    } catch(err) {
        console.log(err);
    }
}

export const deleteRecipe = (userID, recipeID) => async (dispatch) => {
  try {
      await api.delete('/recipe/delete', {headers: {}, data: {userID, recipeID}} )
      .then(res => {
          dispatch({type: DELETE_RECIPE, payload: res.data })
      })
  } catch (err) {
      console.log(err);
      }
}