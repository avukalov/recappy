import {
  SET_PAGER,
  CURRENT_PAGE,
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
  const { currentPage, itemsPerPage } = state;

  switch (type) {
    case SET_PAGER:
      return {
        ...state,
        totalItems: payload.totalItems,
        pages: payload.pages,
      };
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: currentPage + 1,
        skipItems: currentPage * itemsPerPage,
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
