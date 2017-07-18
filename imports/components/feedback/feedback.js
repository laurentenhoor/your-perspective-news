import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './feedback.html';
import style from './feedback.less';

class FeedbackCtrl {
	
  constructor($scope, $location) {
	  
  }
  
}
 
export default angular.module('allpers.feedback', [
  angularMeteor
])
  .component('allpersFeedback', {
    templateUrl : template,
    controller: ['$scope', '$location', FeedbackCtrl]
  });