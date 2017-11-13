import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ScaleLoader } from 'react-spinners';

import style from './bigImage.scss';

class BigImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideImage: false
        };
        this.firstLoad = 1500;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.image) {
            this.setState({ hideImage: true });
            setTimeout(() => {
                this.setState({ hideImage: false }, () => {
                    this.firstLoad = 300;
                });
            }, this.firstLoad);
        }
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
        let { image } = this.props;
        if (!image) {
            return (
                <ScaleLoader
                    color={'#123abc'} 
                    loading={!image}
                />
            );
        }
        let imageStyle = { background: `url(${image.imageUrl}) center center no-repeat` };
        let { hideImage } = this.state;
        return (
            <div 
                className={style.bigImage} 
                data-qa="bigImage">
                
                <input 
                    type="text" 
                    className={style.search} 
                    placeholder="Search ..." 
                    onChange={(e) => this.handleTextChange(e)} 
                />

                <div className={style.imageContainer}>

                    <div
                        className={classnames({[style.hide]: hideImage}, [style.image])}
                        style={imageStyle}>
                    </div>

                    <ScaleLoader
                        color={'#123abc'} 
                        loading={hideImage}
                    />

                </div>

                <span 
                    className={classnames([style.left], { [style.hide]: !this.props.showArrowLeft })} 
                    onClick={e => this.handleDirection(e, 'MOVE_LEFT')}>
                </span>

                <span 
                    className={classnames([style.right], { [style.hide]: !this.props.showArrowRight })} 
                    onClick={e => this.handleDirection(e, 'MOVE_RIGHT')}>
                </span>

            </div>
        );
    }
}

BigImage.proptypes = {
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired
}

export default BigImage;
