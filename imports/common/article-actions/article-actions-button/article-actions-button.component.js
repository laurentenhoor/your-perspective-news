import ArticleActionsButtonTemplate from './article-actions-button.html';
import ArticleActionsButtonStyle from './article-actions-button.styl';

class ArticleActionsButtonComponent {

	constructor($rootScope, $scope, $document, $timeout, $reactive, $auth, $articleActionsDialog) {
		'ngInject';

		var $ctrl = this;

		$ctrl.$onChanges = function (changes) {
			if (changes.topicId) {
				$ctrl.topicId = angular.copy($ctrl.topicId);
			}
			if (changes.article) {
				$ctrl.article = angular.copy($ctrl.article);
			}
		}

		$ctrl.open = function ($event) {

			if (!$auth.isLoggedIn()) {
				return;
			}

			$articleActionsDialog.show(
				$event,
				$ctrl.topicId,
				$ctrl.article
			)

		};
	}
}

export default {
	templateUrl: ArticleActionsButtonTemplate,
	controller: ArticleActionsButtonComponent,
	bindings: {
		topicId: '<',
		article: '<',
	}
}