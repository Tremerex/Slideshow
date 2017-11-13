import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './thumbnail.scss';

const Thumbnail = ({thumbnailUrl, title, index, inlineStyle, selectedClass, onClick}) => {
    let imageStyle = {background: `url(${thumbnailUrl}) center center no-repeat`};
    return (
        <div 
            className={style.thumbnail} 
            onClick={e => onClick(e)}
            style={inlineStyle}
            data-element="thumbnail"
            data-qa="thumbnail">
            
            <div 
                className={classnames([style.thumbnailImage], [style[selectedClass]])} 
                style={imageStyle}>
                
                <span 
                    className={style.title}>
                        {title}
                </span>

            </div>

        </div>
    );
}

Thumbnail.proptypes = {
    thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    style: PropTypes.string.isRequired,
    selectedClass: PropTypes.string,
    onClick: PropTypes.func
}

Thumbnail.defaultProps = {
    title: '',
    index: 0
}

export default Thumbnail;
