import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { ClipLoader } from 'react-spinners';
import BigImage from 'Components/bigImage';
import ThumbnailContainer from 'Components/thumbnailContainer';
import { getPhotos } from 'Actions';
import style from './slideShow.scss';
import cssVariables from '../../global/css/variables.scss';

class SlideShow extends Component {

  static propTypes = {
    photos: PropTypes.object,
    selectedPhoto: PropTypes.object
  }

  state = {
    selectedPhoto: {
      imageUrl: '',
      title: '',
      index: 0
    }
  }

  componentDidMount() {
    this.props.getPhotos();
  }

  setSelectedPhoto(index) {
    let { photoList } = this.props.photos;
    let { imageUrl, title } = photoList.length ? photoList[index] : { imageUrl: '', title: '' };
    this.maxLength = photoList.length - 1;
    this.isFinalImage = index === this.maxLength;
    this.isFirstImage = index === 0;
    this.setState({ selectedPhoto: { imageUrl, title, index } });
  }

  handleArrowClick = (e) => {
    let { index } = e;
    index = Math.max(0, index) && Math.min(index, this.maxLength);
    this.setSelectedPhoto(index);
  }

  handleSearchChange = (e) => {
    debounce(() =>
      this.props.getPhotos(e.text).then(() => {
        this.setSelectedPhoto(0);
      }), 500, {
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
          color={cssVariables.persianBlue}
          loading={!this.props.photos} />
      );
    }

    let { index } = this.state.selectedPhoto;

    return (
      <div
        className={style.container}
        data-qa="slideShow">

        <BigImage
          image={this.state.selectedPhoto}
          isFinalImage={this.isFinalImage}
          isFirstImage={this.isFirstImage}
          onClick={(e) => this.handleArrowClick(e)}
          onTextChange={(e) => this.handleSearchChange(e)} />

        <ThumbnailContainer
          photoList={this.props.photos.photoList}
          selectedIndex={index}
          photosPerPage="4"
          onChange={(e) => this.handleChangeThumbnail(e)} />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  photos: state.flickrApi.photos,
  selectedPhoto: state.photo.selectedPhoto
})

const mapDispatchToProps = (dispatch) => ({
  getPhotos: (searchKeyword) => dispatch(getPhotos(searchKeyword))
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
