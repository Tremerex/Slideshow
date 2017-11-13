import { FETCH_GET_PHOTOS, FETCH_CATCH_PHOTOS_ERROR } from '../constants';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_GET_PHOTOS:
            let { photo, ...photos } = action.payload.photos;
            photos.photoList = photo.map(photo => {
                let { farm, server, id, secret, title } = photo;
                return {
                    thumbnailUrl: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`,
                    imageUrl: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
                    title
                };
            });
            return { ...state, photos: photos };
        case FETCH_CATCH_PHOTOS_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
