import {
  UPDATE_PAGER,
  UPDATE_CURRENT_PAGE,
  UPDATE_SORT_BY,
  UPDATE_ORDER_BY,
  RESET_PAGER,
} from '../../actions/types';

const initialState = {
  totalItems: null,
  currentPage: 1,
  itemsPerPage: 24,
  skipItems: 0,
  pages: null,
  sortBy: 'relevance',
  orderBy: -1,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  const { currentPage, itemsPerPage } = state;

  switch (type) {
    case UPDATE_PAGER:
      return {
        ...state,
        totalItems: payload.totalItems,
        pages: payload.pages,
      };
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
        skipItems:
          currentPage < payload
            ? (payload - 1) * itemsPerPage
            : payload - 2 < 0
            ? 0
            : (payload - 2) * itemsPerPage,
      };
    case UPDATE_SORT_BY:
      return {
        ...state,
        sortBy: payload,
      };
    case UPDATE_ORDER_BY:
      return {
        ...state,
        orderBy: payload,
      };
    case RESET_PAGER:
      return (state = initialState);
    default:
      return state;
  }
}
