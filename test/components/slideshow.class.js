/*global browser*/

import Main from './main';

import { DELAY } from './common';

export class SlideShow extends Main {

  constructor() {
    super('/');
    browser.pause(DELAY.MEDIUM);
  }

  get slideShow() {
    return browser.element('[data-qa=slideShow]');
  }

  get bigImage() {
    return browser.element('[data-qa=bigImage]');
  }

  get thumbnailList() {
    return browser.elements('[data-qa=thumbnailContainer] > div');
  }

  get arrows() {
    return browser.elements('[data-qa=bigImage] > span:not([class*=hide])');
  }

  get inputText() {
    return browser.element('[data-qa=bigImage] > input[type=text]');
  }

  waitForFinish() {
    browser.pause(DELAY.MEDIUM);
  }

  checkSlideShow() {
    const element = this.slideShow;
    browser.waitUntil(() => element.isExisting());
    return element.isExisting();
  }

  checkIfSlideShowLoadThumbnailList() {
    const elementList = this.thumbnailList;
    elementList.waitForExist(DELAY.FAST);
    return !!elementList.value.length;
  }

  checkIfHasOneArrowAtStart() {
    const elementList = this.arrows;
    elementList.waitForExist(DELAY.FAST);
    return elementList.value.length;
  }

  setBigImageFocus() {
    const element = this.bigImage;
    browser.waitUntil(() => element.isExisting());
    browser.moveToObject(element.selector, 10, 10);
    browser.pause(DELAY.FAST);
  }

  clickOnRightArrow() {
    this.setBigImageFocus();
    const element = this.arrows.value[0];
    browser.waitUntil(() => element.isExisting());
    element.click();
    const elementList = this.arrows;
    elementList.waitForExist(DELAY.FAST);
    return elementList.value.length;
  }

  clickOnLeftArrow() {
    this.setBigImageFocus();
    const element = this.arrows.value[0];
    browser.waitUntil(() => element.isExisting());
    element.click();
    const elementList = this.arrows;
    elementList.waitForExist(DELAY.FAST);
    return elementList.value.length;
  }

  setTextOnInputSearchFilter() {
    this.setBigImageFocus();
    const element = this.inputText;
    browser.waitUntil(() => element.isExisting());
    element.setValue('....');
    browser.pause(DELAY.MEDIUM);
    return this.thumbnailList.value.length;
  }

}
