import { SELECTED_PHOTO } from 'Constants';

export const setSelectedPhoto = (photo) =>
  (dispatch) => dispatch({
    type: SELECTED_PHOTO,
    payload: photo
  })
