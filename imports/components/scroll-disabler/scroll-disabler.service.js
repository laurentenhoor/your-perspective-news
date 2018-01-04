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