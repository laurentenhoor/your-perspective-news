import angular from 'angular';

import DaySelectorComponent from './day-selector.component';
import DaySelectorService from './day-selector.service';

export default angular
    .module('DaySelector', [])
    .service('$daySelector', DaySelectorService)
    .component('daySelector', DaySelectorComponent)
    .name;