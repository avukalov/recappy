import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import query from './search/query';
import pager from './search/pager';
import search from './search/search';
import filters from './search/filters';
import recipes from './recipes';
import userRecipes from './userRecipes';

export default combineReducers({
  alert,
  auth,
  query,
  pager,
  search,
  filters,
  recipes,
  userRecipes
});
