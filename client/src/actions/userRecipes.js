import {
    USER_RECIPES,
    USER_FAVORITES,
} from './types';
import api from '../utils/api';

export const getUserRecipes = (userID) => async(dispatch) => {
    try {
        await api.get(`/recipe/userRecipes/${userID}`)
        .then(res => {
            dispatch({ type: USER_RECIPES, payload: res.data })
        })
    } catch(err){
        console.log(err);
    }
}

export const getUserFavorites = (userID) => async(dispatch) => {
    try {
        await api.get(`/user/favorites/${userID}`)
        .then(res => {
            dispatch({ type: USER_FAVORITES, payload: res.data });
        })
    } catch(err){
        console.log(err);
    }
}

export const updateUserFavorites = (userID, favorites) => async(dispatch) => {
    try {
        await api.put('/user/favorites', { userID, favorites })
        .then(res => {
            dispatch({ type: USER_FAVORITES, payload: res.data });
        })} catch(err) {
        console.log(err);
    }
}

export const handleFavorites = (type, payload) => dispatch => {
    dispatch({ type, payload });
}
