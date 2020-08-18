import {
  FETCH_SEARCH_QUERY,
  UPDATE_SEARCH_RESULTS,
  UPDATE_CURRENT_RECIPE,
  NO_SEARCH_RESULTS,
  UPDATE_PAGER,
  FETCH_FILTERS,
  UPDATE_FILTERS,
} from '../types';
import api from '../../utils/api';

export const getSearchQueryResults = (query, pager) => async (dispatch) => {
  dispatch({ type: FETCH_SEARCH_QUERY });

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
        veryHealthy: query.veryHealthy,
        itemsPerPage: pager.itemsPerPage,
        skipItems: pager.skipItems,
        sortBy: pager.sortBy,
        orderBy: pager.orderBy,
      },
    });

    dispatch({ type: UPDATE_SEARCH_RESULTS, payload: data.recipes });
    dispatch({ type: UPDATE_PAGER, payload: data.pager });
  } catch (err) {
    dispatch({ type: NO_SEARCH_RESULTS });
  }
};

export const getRecipeById = (id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/recipe/search/${id}`);

    console.log(data);
    dispatch({ type: UPDATE_CURRENT_RECIPE, payload: data });
  } catch (err) {
    dispatch({ type: NO_SEARCH_RESULTS });
  }
};

export const getFiltersFromResults = (query) => async (dispatch) => {
  dispatch({ type: FETCH_FILTERS });

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
        veryHealthy: query.veryHealthy,
      },
    });

    dispatch({ type: UPDATE_FILTERS, payload: data.filters });
  } catch (err) {
    console.log(err);
  }
};
