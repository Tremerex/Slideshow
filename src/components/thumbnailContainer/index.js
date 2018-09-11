import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Thumbnail from 'Components/thumbnail';
import style from './thumbnailContainer.scss';

class ThumbnailContainer extends Component {

  static propTypes = {
    photoList: PropTypes.array.isRequired,
    photosPerPage: PropTypes.string.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func
  }

  componentDidMount() {
    this.clickThumbnail(this.currentPage = 0);
  }

  containerRef = (element) => {
    if (element) {
      this.width =  element.getBoundingClientRect().width;
    }
  }

  clickThumbnail(index) {
    this.props.onChange({ index });
  }

  handleThumbnailClick = (e, index) => {
    this.clickThumbnail(index);
  }

  render() {
    const { photoList, photosPerPage, selectedIndex } = this.props;
    const maxPages = ~~(photoList.length/photosPerPage) + 1;
    const currentPage = ~~(selectedIndex/photosPerPage);
    const translate = -((this.width - 44) * currentPage);
    let thumbnailStyle = {
      width: `calc(100% * (1 / ${photosPerPage}) - 40px)`,
      transform: `translateX(${translate}px)`
    };
    return (
      <div
        ref={this.containerRef}
        className={style.thumbnailList}
        data-qa="thumbnailContainer">

        <ul
          className={style.paginator}>

          {
            [...Array(maxPages).keys()].map((index) => (
              <li
                key={index}
                className={classnames({[style.active]: currentPage === index})}>
              </li>
            ))
          }

        </ul>

        {
          photoList.map((photo, key) => (
            <Thumbnail
              key={key}
              thumbnailUrl={photo.thumbnailUrl}
              title={photo.title}
              index={key}
              inlineStyle={thumbnailStyle}
              selectedClass={key === selectedIndex ? 'active' : ''}
              onClick={(e) => this.handleThumbnailClick(e, key)} />
            )
          )
        }

      </div>
    );
  }
}

ThumbnailContainer.defaultProps = {
    photosPerPage: 4
}

export default ThumbnailContainer;
