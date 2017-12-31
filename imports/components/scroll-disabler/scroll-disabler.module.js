import angular from 'angular';

import ScrollDisablerService from './scroll-disabler.service';

export default angular
    .module('ScrollDisabler', [])
    .service('$scrollDisabler', ScrollDisablerService)
    .name;