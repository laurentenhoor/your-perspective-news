import angular from 'angular';
import angularMaterial from 'angular-material';

import FeedbackComponent from './feedback.component';

export default angular
    .module('feedback', [angularMaterial,])
    .component('feedback', FeedbackComponent)
    .name;
