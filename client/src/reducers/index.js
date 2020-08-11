import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import query from './search/query';
import pager from './search/pager';
import recipes from './search/recipes';
import filters from './search/filters';

export default combineReducers({
  alert,
  auth,
  query,
  pager,
  recipes,
  filters,
});
