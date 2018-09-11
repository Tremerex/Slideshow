import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ScaleLoader } from 'react-spinners';
import style from './bigImage.scss';
import cssVariables from '../../global/css/variables.scss';

class BigImage extends Component {

  static propTypes = {
    image: PropTypes.object,
    isFinalImage: PropTypes.bool,
    isFirstImage: PropTypes.bool,
    onClick: PropTypes.func,
    onTextChange: PropTypes.func
  }

  state = {
    hideImage: false
  }

  handleDirection = (e, direction) => {
    let { index } = this.props.image;
    direction === 'MOVE_LEFT' ? --index : ++index;
    this.props.onClick({ index });
  }

  handleTextChange = ({ target }) => {
    this.props.onTextChange({ text: target.value });
  }

  render() {
    const { image } = this.props;
    if (!image) {
      return (
        <ScaleLoader
          color={cssVariables.persianBlue}
          loading={!image} />
      );
    }

    const imageStyle = { background: `url(${image.imageUrl}) center center no-repeat` };
    const { hideImage } = this.state;
    const { isFirstImage, isFinalImage } = this.props;

    return (

      <div
        className={style.bigImage}
        data-qa="bigImage">

        <input
            type="text"
            className={style.search}
            placeholder="Search ..."
            onChange={(e) => this.handleTextChange(e)} />

        <div
          className={style.imageContainer}>

          <div
            className={classnames({[style.hide]: hideImage}, [style.image])}
            style={imageStyle}>
          </div>

          <ScaleLoader
            color={'#123abc'}
            loading={hideImage} />

        </div>

        <span
          className={classnames([style.left], { [style.hide]: isFirstImage})}
          onClick={e => this.handleDirection(e, 'MOVE_LEFT')}>
        </span>

        <span
          className={classnames([style.right], { [style.hide]: isFinalImage })}
          onClick={e => this.handleDirection(e, 'MOVE_RIGHT')}>
        </span>

      </div>
    );
  }
}

export default BigImage;
