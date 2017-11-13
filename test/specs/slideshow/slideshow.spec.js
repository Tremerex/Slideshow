import { should } from 'chai';
import { SlideShow } from '../../components';

var slideShow = null;

describe('Slide Show Component', () => {
    before(() => {
        slideShow = new SlideShow();
        should();
    });

    it('Should exists the slideshow', () => {
        var result = slideShow.checkSlideShow();
        result.should.be.true;
    });

    it('Should be has a list of Thumbnail Elements', () => {
        var result = slideShow.checkIfSlideShowLoadThumbnailList();
        result.should.be.true;
    });

    it('Should be has one arrow at start', () => {
        var result = slideShow.checkIfHasOneArrowAtStart() === 1;
        result.should.be.true;
    });

    it('Should makes click on right arrow and show the both arrow', () => {
        var result = slideShow.clickOnRightArrow() === 2;
        result.should.be.true;
    });

    it('Should makes click on left arrow and show only the right arrow', () => {
        var result = slideShow.clickOnLeftArrow() === 1;
        result.should.be.true;
    });

    it('Should makes filter with a wrong text and show a empty thumbnail List of items', () => {
        var result = slideShow.setTextOnInputSearchFilter() === 0;
        result.should.be.true;
        slideShow.waitForFinish();
    });    

});