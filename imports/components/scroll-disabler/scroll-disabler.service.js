import angular from 'angular';

import style from './scroll-disabler.styl';

export default class ScrollDisablerService {

    constructor() {
        'ngInject';
        this.scrollingDisabled = false;
    }

    isScrollingDisabled() {
        return this.scrollingDisabled;
    }

    disable() {
        this.scrollingDisabled = true;
    }

    enable() {
        this.scrollingDisabled = false;
    }

}

function getElements(className) {
    let query = document.getElementsByClassName(className);
    let elements = angular.element(query);
    return elements;
}