import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import query from './search/query';
import pager from './search/pager';
import search from './search/search';
import filters from './search/filters';
<<<<<<< HEAD
import recipes from './recipes';
import userRecipes from './userRecipes';
=======
import carousel from './utils/carousel';
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9

export default combineReducers({
  alert,
  auth,
  query,
  pager,
  search,
  filters,
<<<<<<< HEAD
  recipes,
  userRecipes
=======
  carousel,
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9
});
