import angular from 'angular';
import angularMaterial from 'angular-material';

import FeedbackButtonComponent from './feedback-button.component';

export default angular
    .module('FeedbackButton', [angularMaterial,])
    .component('feedbackButton', FeedbackButtonComponent)
    .name;