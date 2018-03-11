import ArticleActionsButtonTemplate from './article-actions-button.html';
import ArticleActionsButtonStyle from './article-actions-button.styl';

class ArticleActionsButtonComponent {

	constructor($reactive, $scope, $document, $timeout, $reactive, $auth, $articleActionsDialog) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope)

		$ctrl.$onChanges = function (changes) {
			if (changes.topicId) {
				$ctrl.topicId = angular.copy($ctrl.topicId);
			}
			if (changes.article) {
				$ctrl.article = angular.copy($ctrl.article);
			}
		}

		$ctrl.helpers({
			isAdmin:()=>{
				return $auth.isAdmin();
			}
		})

		$ctrl.open = function ($event) {

			if (!$auth.isLoggedIn()) {
				return;
			}

			$articleActionsDialog.show(
				$event,
				$ctrl.topicId,
				$ctrl.article
			).then(function (answer) {
				console.log('You answered the article-actions-dialog.')
			}, function (answer) {
				console.log('You cancelled the article-actions-dialog.');
			})

		};
	}
}

export default {
	templateUrl: ArticleActionsButtonTemplate,
	controller: ArticleActionsButtonComponent,
	bindings: {
		topicId: '<',
		article: '<'
	}
}