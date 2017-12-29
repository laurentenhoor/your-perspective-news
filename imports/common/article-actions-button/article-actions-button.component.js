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
			if (changes.category) {
				$ctrl.category = angular.copy($ctrl.category);
			}
			if (changes.article) {
				$ctrl.article = angular.copy($ctrl.article);
			}
		}

		$ctrl.blurAllInputs = function () {

			var inputs = $document[0].querySelectorAll('input');

			console.log(inputs);

			inputs.forEach(function (input) {
				console.log(input.name + ': ' + input.value);
				console.log(input);
				input.blur();
			});
		}

		$ctrl.open = function ($event) {

			if (!$auth.isLoggedIn()) {
				return;
			}

			console.log({
				topicId: $ctrl.topicId,
				category: $ctrl.category,
				article: $ctrl.article,
			})

			$articleActionsDialog.show(
				$event,
				$ctrl.topicId,
				$ctrl.category,
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
		category: '<',
		article: '<',
	}
}