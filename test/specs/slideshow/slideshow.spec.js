import { should } from 'chai';
import { SlideShow } from '../../components';

let slideShow = null;

describe('Slide Show Component', () => {

  before(() => {
    slideShow = new SlideShow();
    should();
  });

  it('Should exists the slideshow', () => {
    const result = slideShow.checkSlideShow();
    result.should.be.true;
  });

  it('Should be has a list of Thumbnail Elements', () => {
    const result = slideShow.checkIfSlideShowLoadThumbnailList();
    result.should.be.true;
  });

  it('Should be has one arrow at start', () => {
    const result = slideShow.checkIfHasOneArrowAtStart() === 1;
    result.should.be.true;
  });

  it('Should makes click on right arrow and show the both arrow', () => {
    const result = slideShow.clickOnRightArrow() === 2;
    result.should.be.true;
  });

  it('Should makes click on left arrow and show only the right arrow', () => {
    const result = slideShow.clickOnLeftArrow() === 1;
    result.should.be.true;
  });

  it('Should makes filter with a wrong text and show a empty thumbnail List of items', () => {
    const result = slideShow.setTextOnInputSearchFilter() === 0;
    result.should.be.true;
    slideShow.waitForFinish();
  });

});