import {
  FETCH_RECIPES,
  // FETCH_MORE_RECIPES,
  SET_RECIPES,
  SET_FILTERS,
  // RESET_FILTERS,
  SET_PAGER,
  NO_RESULTS,
} from '../types';
import api from '../../utils/api';

export const sendQueryRecipes = (query, pager) => async (dispatch) => {
  dispatch({ type: FETCH_RECIPES });
  // if (pager.currentPage === 1) {
  //   dispatch({ type: FETCH_RECIPES });
  // } else {
  //   dispatch({ type: FETCH_MORE_RECIPES });
  // }

  try {
    const { data } = await api.get('/recipe/search', {
      params: {
        text: query.text,
        includedIngredients: query.includedIngredients,
        excludedIngredients: query.excludedIngredients,
        cuisines: query.cuisines,
        dishTypes: query.dishTypes,
        diets: query.diets,
        occasions: query.occasions,
        itemsPerPage: pager.itemsPerPage,
        skipItems: pager.skipItems,
      },
    });

    // if (pager.currentPage !== 1) {
    //   dispatch({ type: APPEND_RECIPES, payload: data.recipes });
    // } else {
    //   dispatch({ type: SET_RECIPES, payload: data.recipes });
    // }

    dispatch({ type: SET_RECIPES, payload: data.recipes });
    dispatch({ type: SET_PAGER, payload: data.pager });
  } catch (err) {
    dispatch({ type: NO_RESULTS });
    // const { msg } = err.response.data;

    // if (msg && msg === 'No results') {

    // }
  }
};

export const sendQueryFilters = (query) => async (dispatch) => {
  try {
    const { data } = await api.get('/recipe/filters', {
      params: {
        text: query.text,
        includedIngredients: query.includedIngredients,
        excludedIngredients: query.excludedIngredients,
        cuisines: query.cuisines,
        dishTypes: query.dishTypes,
        diets: query.diets,
        occasions: query.occasions,
      },
    });

    dispatch({ type: SET_FILTERS, payload: data.filters });
  } catch (err) {
    console.log(err);
  }
};
