import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './thumbnail.scss';

const Thumbnail = (props) => (
  <div
    className={style.thumbnail}
    onClick={e => props.onClick(e)}
    style={props.inlineStyle}
    data-qa="thumbnail">

    <div
      className={classnames([style.thumbnailImage], [style[props.selectedClass]])}
      style={{background: `url(${props.thumbnailUrl}) center center no-repeat`}}>

      <span
        className={style.title}>
        {props.title}
      </span>

    </div>

  </div>
)

Thumbnail.propTypes = {
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  inlineStyle: PropTypes.object,
  selectedClass: PropTypes.string,
  onClick: PropTypes.func
}

Thumbnail.defaultProps = {
  title: '',
  index: 0
}

export default Thumbnail;
