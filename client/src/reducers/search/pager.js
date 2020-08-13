import {
  SET_PAGER,
  SET_PAGE,
  CURRENT_PAGE_INCR,
  CURRENT_PAGE_DECR,
  FIRST_PAGE,
  LAST_PAGE,
  ITEMS_PER_PAGE,
  RESET_PAGER,
} from '../../actions/types';

const initialState = {
  totalItems: null,
  currentPage: 1,
  itemsPerPage: 20,
  skipItems: 0,
  pages: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  const { currentPage, itemsPerPage, pages } = state;

  switch (type) {
    case SET_PAGER:
      return {
        ...state,
        totalItems: payload.totalItems,
        pages: payload.pages,
      };
    case SET_PAGE:
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
    case CURRENT_PAGE_INCR:
      return {
        ...state,
        currentPage: currentPage + 1,
        skipItems: currentPage * itemsPerPage,
      };
    case CURRENT_PAGE_DECR:
      return {
        ...state,
        currentPage: currentPage - 1,
        skipItems: currentPage - 2 < 0 ? 0 : (currentPage - 2) * itemsPerPage,
      };
    case FIRST_PAGE:
      return {
        ...state,
        currentPage: 1,
        skipItems: 0,
      };
    case LAST_PAGE:
      return {
        ...state,
        currentPage: pages,
        skipItems: (pages - 1) * itemsPerPage,
      };
    case ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: payload,
      };
    case RESET_PAGER:
      return (state = initialState);
    default:
      return state;
  }
}
