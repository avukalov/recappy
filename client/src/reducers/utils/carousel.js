import {
  FETCH_CAROUSEL,
  UPDATE_CAROUSEL_QUERY,
  UPDATE_CAROUSEL_ITEMS,
  // UPDATE_CAROUSEL_PAGER,
  UPDATE_CAROUSEL_CURRENT_PAGE,
  NO_CAROUSEL_ITEMS,
} from '../../actions/types';

const initialState = {
  items: [],
  query: ['dinner'],
  currentPage: 0,
  itemsPerPage: 3,
  itemsPerList: 12,
  skipItems: 0,
  pages: 4,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  const { currentPage, itemsPerPage, itemsPerList } = state;

  switch (type) {
    case FETCH_CAROUSEL:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CAROUSEL_QUERY:
      return {
        ...state,
        query: [payload],
      };
    case UPDATE_CAROUSEL_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    // case UPDATE_CAROUSEL_PAGER:
    //   return {
    //     ...state,
    //     pages: itemsPerList / itemsPerPage,
    //   };
    case UPDATE_CAROUSEL_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload.currentPage,
        skipItems:
          currentPage < payload.currentPage
            ? (payload.currentPage - 1) * itemsPerList
            : payload.currentPage - 2 < 0
            ? 0
            : (payload.currentPage - 2) * itemsPerList,
      };
    case NO_CAROUSEL_ITEMS:
      return {
        ...state,
        items: [],
        loading: false,
      };
    default:
      return state;
  }
}
