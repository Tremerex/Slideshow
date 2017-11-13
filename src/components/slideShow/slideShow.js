import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { ClipLoader } from 'react-spinners';

import BigImage from '../bigImage/bigImage';
import ThumbnailContainer from '../thumbnailContainer/thumbnailContainer';

import { getPhotos } from '../../actions';

import style from './slideShow.scss';

class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhoto: {
                imageUrl: '',
                title: '',
                index: 0
            },
        };
    }
    componentDidMount() {
        this.props.getPhotos();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.photos) {
            this.maxLength = nextProps.photos.photoList.length - 1;
        }
    }
    setSelectedPhoto(index) {
        let { photoList } = this.props.photos;
        let { imageUrl, title } = photoList.length ? photoList[index] : { imageUrl: '', title: '' };
        this.showArrowLeft = index > 0;
        this.showArrowRight = index < this.maxLength;
        this.setState({ selectedPhoto: { imageUrl, title, index } });
    }
    handleArrowClick = (e) => {
        let { index } = e;
        index = Math.max(0, index) && Math.min(index, this.maxLength);
        this.setSelectedPhoto(index);
    }
    handleSearchChange = (e) => {
        debounce(() => {
            this.props.getPhotos(e.text).then(() => {
                this.setSelectedPhoto(0);
            });
        }, 500, {
            leading: true,
            trailing: false
        })();
    }
    handleChangeThumbnail = (e) => {
        let { index } = e;
        this.setSelectedPhoto(index);
    }
    render() {
        if (!this.props.photos) {
            return (
                <ClipLoader
                    color={'#123abc'} 
                    loading={!this.props.photos}
                />
            );
        }
        let { index } = this.state.selectedPhoto;
        return (
            <div 
                className={style.container} 
                data-qa="slideShow">

                <BigImage 
                    image={this.state.selectedPhoto}
                    showArrowLeft={this.showArrowLeft}
                    showArrowRight={this.showArrowRight}
                    onClick={(e) => this.handleArrowClick(e)}
                    onTextChange={(e) => this.handleSearchChange(e)}
                />

                <ThumbnailContainer 
                    photoList={this.props.photos.photoList}
                    selectedIndex={index}
                    photosPerPage="4"
                    onChange={(e) => this.handleChangeThumbnail(e)} 
                />

            </div>
        );
    }
}

ThumbnailContainer.proptypes = {
    photos: PropTypes.object.isRequired,
    selectedPhoto: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        photos: state.flickrApi.photos,
        selectedPhoto: state.photo.selectedPhoto
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPhotos: (searchKeyword) => dispatch(getPhotos(searchKeyword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
