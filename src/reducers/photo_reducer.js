import { SELECTED_PHOTO } from '../constants';

export default (state = {}, action) => {
    switch(action.type) {
        case  SELECTED_PHOTO: 
            return { ...state, selectedPhoto: action.payload };
        default:
            return state;
    }
}