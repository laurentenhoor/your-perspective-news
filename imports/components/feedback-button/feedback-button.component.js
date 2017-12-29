import FeedbackTemplate from './feedback-button.html';
import FeedbackStyle from './feedback-button.styl';

class FeedbackComponent {

	constructor($feedbackDialog) {
		'ngInject';

		var $ctrl = this;

		$ctrl.open = function($event) {
			$feedbackDialog.show($event);
		}

	}

}

export default {
	templateUrl: FeedbackTemplate,
	controller: FeedbackComponent
}