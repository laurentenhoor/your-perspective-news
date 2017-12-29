import FeedbackTemplate from './feedback.html';
import FeedbackStyle from './feedback.styl';
import FeedbackDialog from '../feedback-dialog/feedback-dialog.service';

class FeedbackComponent {

	constructor($feedbackDialog) {
		'ngInject';

		var $ctrl = this;

		$ctrl.open = function ($event) {
			console.log($feedbackDialog);
			$feedbackDialog.show($event);
		}

	}

}

export default {
	templateUrl: FeedbackTemplate,
	controller: FeedbackComponent
}