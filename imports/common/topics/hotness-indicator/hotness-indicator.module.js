import angular from 'angular';

import HotnessIndicatorComponent from './hotness-indicator.component';

export default angular
    .module('HotnessIndicator', [])
    .component('hotnessIndicator', HotnessIndicatorComponent)
    .name;