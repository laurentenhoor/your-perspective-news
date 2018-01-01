import angular from 'angular';

import ScrollDisablerService from './scroll-disabler.service';
import ScrollDisablerDirective from './scroll-disabler.directive';

export default angular
    .module('ScrollDisabler', [])
    .service('$scrollDisabler', ScrollDisablerService)
    .directive('scrollDisabler', ['$scrollDisabler', ($scrollDisabler) => new ScrollDisablerDirective($scrollDisabler)])
    .name;