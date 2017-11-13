import { SELECTED_PHOTO } from '../constants';

export const setSelectedPhoto = photo => dispatch => dispatch({
    type: SELECTED_PHOTO,
    payload: photo
});
