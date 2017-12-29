import angular from 'angular';
import angularMaterial from 'angular-material';

import FeedbackDialog from './feedback-dialog.service'

export default angular
    .module('FeedbackDialog', [angularMaterial])
    .service('$feedbackDialog', FeedbackDialog.factory)
    .name