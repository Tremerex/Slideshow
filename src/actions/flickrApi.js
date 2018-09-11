import axios from 'axios';

import {
  FETCH_CATCH_PHOTOS_ERROR,
  FETCH_GET_PHOTOS,
  FLICKR_API_URL
} from 'Constants';

export const getPhotos = (searchKeyword = '') =>
  (dispatch) =>
    axios.get(`${FLICKR_API_URL}&text=${searchKeyword}`)
      .then(({data}) => dispatch({
        type: FETCH_GET_PHOTOS,
        payload: data
    })).catch((error) => dispatch({
      type: FETCH_CATCH_PHOTOS_ERROR,
      payload: error
    }))
