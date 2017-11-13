import axios from 'axios';

import { API_KEY, USER_ID, FETCH_GET_PHOTOS, FETCH_CATCH_PHOTOS_ERROR } from '../constants';

export const getPhotos = (searchKeyword = '') => dispatch => {
    let apiUrl = `https://api.flickr.com/services/rest/?api_key=${API_KEY}&method=flickr.photos.search&user_id=${USER_ID}&format=json&nojsoncallback=1&per_page=15&page=0&text=${searchKeyword}`;
    return axios.get(apiUrl).then(({data}) => dispatch({
        type: FETCH_GET_PHOTOS,
        payload: data
    })).catch(error => dispatch({
        type: FETCH_CATCH_PHOTOS_ERROR,
        payload: error
    }));
}
