import {
  FETCH_CAROUSEL,
  UPDATE_CAROUSEL_ITEMS,
  UPDATE_CAROUSEL_PAGER,
  NO_CAROUSEL_ITEMS,
} from '../types';
import api from '../../utils/api';

export const getCarouselData = (request) => async (dispatch) => {
  dispatch({ type: FETCH_CAROUSEL });

  console.log('request', request);
  try {
    const { data } = await api.get('/recipe/carousel', {
      params: {
        dishTypes: request.query,
        itemsPerPage: request.itemsPerList,
        skipItems: request.skipItems,
      },
    });

    console.log(data);

    dispatch({ type: UPDATE_CAROUSEL_ITEMS, payload: data.recipes });
    dispatch({ type: UPDATE_CAROUSEL_PAGER, payload: data.pager });
  } catch (err) {
    dispatch({ type: NO_CAROUSEL_ITEMS });
  }
};
