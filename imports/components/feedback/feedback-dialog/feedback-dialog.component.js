import angular from 'angular';
import angularMeteor from 'angular-meteor';

export default class FeedbackDialogComponent {

	constructor($scope, $reactive, $feedbackDialog) {
		'ngInject';

		this.sendFeedback = function (feedback) {
			console.log('sendFeedback()')
			console.log(feedback);
			$feedbackDialog.storeFeedback(feedback);
		}

		this.cancel = function () {
			$feedbackDialog.cancel();
		}

	}

}
