import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularBootstrap from 'angular-ui-bootstrap';

import template from './feedback.html';
import style from './feedback.less';

class FeedbackCtrl {
	
  constructor($scope, $location) {
	  
  }
  
}
 
export default angular.module('allpers.feedback', [
  angularMeteor, angularBootstrap
])
  .component('allpersFeedback', {
    templateUrl : template,
    controller: ['$scope', '$location', FeedbackCtrl]
  });