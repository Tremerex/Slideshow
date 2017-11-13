import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Thumbnail from '../thumbnail/thumbnail';

import style from './thumbnailContainer.scss';

class ThumbnailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
    }
    componentDidMount() {
        this.currentPage = 0;
        this.clickThumbnail(0);
    }
    componentWillReceiveProps(nextProps) {
        this.maxPages = ~~(nextProps.photoList.length / nextProps.photosPerPage) + 1;
        if (nextProps.selectedIndex) {
            this.move(nextProps.selectedIndex);
        }
    }
    clickThumbnail(index) {
        this.props.onChange({ index });
    }
    handleThumbnailClick = (e, index) => {
        this.clickThumbnail(index);
    }
    move(index) {
        let element = document.querySelector('[data-element="thumbnail"]');
        this.setState({ width: element.getBoundingClientRect().width });
    }
    render() {
        let { photoList, photosPerPage, selectedIndex } = this.props;
        let { width } = this.state;
        let page = ~~(selectedIndex/photosPerPage);
        let thumbnailStyle = {
            width: `calc(100% * (1/${photosPerPage}) - 40px)`,
            transform: `translateX(${-(width + 40) * page * photosPerPage}px)`
        };
        return (
            <div
                className={style.thumbnailList} 
                data-qa="thumbnailContainer">
                <ul className={style.paginator}>
                    {
                        [...Array(this.maxPages)].map((item, index) => 
                            (<li
                                key={index}
                                className={classnames({[style.active]: page === index})}>
                            </li>)
                        )
                    }
                </ul>


                {
                    photoList.map((photo, key) => {
                        let { thumbnailUrl, title } = photo;
                        return (
                            <Thumbnail
                                key={key}
                                thumbnailUrl={thumbnailUrl}
                                title={title}
                                index={key}
                                inlineStyle={thumbnailStyle}
                                selectedClass={key === selectedIndex ? 'active' : ''}
                                onClick={(e) => this.handleThumbnailClick(e, key)}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

ThumbnailContainer.proptypes = {
    photoList: PropTypes.object.isRequired,
    photosPerPage: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func
}

ThumbnailContainer.defaultProps = {
    photosPerPage: 4
}

export default ThumbnailContainer;
