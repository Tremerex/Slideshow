export const FETCH_GET_PHOTOS = 'FETCH_PHOTOS';
export const FETCH_CATCH_PHOTOS_ERROR = 'FETCH_CATCH_PHOTOS_ERROR';

export const SELECTED_PHOTO = 'SELECTED_PHOTO';

const API_KEY = 'fa82a6bba70f7b79d8a3dbf06b71ad6e';
const USER_ID = '157104754@N05';

export const FLICKR_API_URL =
  `https://api.flickr.com/services/rest/?api_key=${API_KEY}&method=flickr.photos.search&user_id=${USER_ID}&format=json&nojsoncallback=1&per_page=15&page=0`;
