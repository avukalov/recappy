import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import query from './search/query';
import pager from './search/pager';
import search from './search/search';
import filters from './search/filters';
import carousel from './utils/carousel';

export default combineReducers({
  alert,
  auth,
  query,
  pager,
  search,
  filters,
  carousel,
});
