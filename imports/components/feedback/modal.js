import angular from 'angular';
import angularMeteor from 'angular-meteor';

class FeedbackModalCtrl {

	constructor($scope, $mdDialog) {

		var $ctrl = this;

		$ctrl.sendFeedback = function (feedback) {
			console.log('sendFeedback()')
			console.log(feedback);
			$mdDialog.hide(feedback);
		}

		$ctrl.cancel = function () {
			$mdDialog.cancel();
		}

	}

}

const name = 'FeedbackModalCtrl'

export default angular.module(name, [
	angularMeteor,
]).controller(name, [
	'$scope', '$mdDialog', FeedbackModalCtrl]);