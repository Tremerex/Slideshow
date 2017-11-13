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
        var element = this.slideShow;
        browser.waitUntil(() => element.isExisting());
        return element.isExisting();
    }
    checkIfSlideShowLoadThumbnailList() {
        var elementList = this.thumbnailList;
        elementList.waitForExist(DELAY.FAST);
        return !!elementList.value.length;
    }
    checkIfHasOneArrowAtStart() {
        var elementList = this.arrows;
        elementList.waitForExist(DELAY.FAST);
        return elementList.value.length;
    }
    setBigImageFocus() {
        var element = this.bigImage;
        browser.waitUntil(() => element.isExisting());
        browser.moveToObject(element.selector, 10, 10);
        browser.pause(DELAY.FAST);
    }
    clickOnRightArrow() {
        this.setBigImageFocus();
        var element = this.arrows.value[0];
        browser.waitUntil(() => element.isExisting());
        element.click();
        var elementList = this.arrows;
        elementList.waitForExist(DELAY.FAST);
        return elementList.value.length;
    }
    clickOnLeftArrow() {
        this.setBigImageFocus();
        var element = this.arrows.value[0];
        browser.waitUntil(() => element.isExisting());
        element.click();
        var elementList = this.arrows;
        elementList.waitForExist(DELAY.FAST);
        return elementList.value.length;
    }
    setTextOnInputSearchFilter() {
        this.setBigImageFocus();
        var element = this.inputText;
        browser.waitUntil(() => element.isExisting());
        element.setValue('djkfhjkhdafgdshjkfgjhksdafghjv<cbjhvshjvdgsvdfghvdadh8usagdhjsgah');
        browser.pause(DELAY.MEDIUM);
        return this.thumbnailList.value.length;
    }
}