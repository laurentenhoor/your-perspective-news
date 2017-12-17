import angular from 'angular';
import angularMeteor from 'angular-meteor';

class FeedbackModalCtrl {
	
	constructor($scope) {
		
		var $ctrl = this;

	}
	
}

const name = 'FeedbackModalCtrl'

export default angular.module(name, [
	angularMeteor,
]).controller(name, [
	'$scope', FeedbackModalCtrl]);