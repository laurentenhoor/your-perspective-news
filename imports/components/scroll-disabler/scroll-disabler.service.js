import angular from 'angular';

import style from './scroll-disabler.styl';

export default class ScrollDisablerService {

    // add class="scroll-disabler" to the DOM elements to affect
    constructor() {
        'ngInject';

        this.className = 'scroll-disabler';
        this.scrollingDisabled = false;

    }

    isScrollingDisabled() {
        return this.scrollingDisabled;
    }

    disable() {
        console.log('Disable scrolling');
        getElements(this.className).addClass('scrolling-disabled');
        this.scrollingDisabled = true;
    }

    enable() {
        console.log('Re-enable scrolling');
        getElements(this.className).removeClass('scrolling-disabled');
        this.scrollingDisabled = false;
    }

}

function getElements(className) {
    let query = document.getElementsByClassName(className);
    let elements = angular.element(query);
    return elements;
}