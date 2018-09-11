import { combineReducers } from 'redux';

import flickrApi from './flickrApi_reducer';
import photo from './photo_reducer';

export default combineReducers({
  flickrApi,
  photo
});
