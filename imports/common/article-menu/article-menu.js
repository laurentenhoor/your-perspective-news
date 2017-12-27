import angular from 'angular';
import angularMeteor from 'angular-meteor';

import materialModalTemplate from './article-dialog.html';
import materialModalCtrl from './article-dialog.js';

import template from './article-menu.html';
import style from './article-menu.styl';

class ArticleActionsCtrl {

	constructor($rootScope, $scope, $document, $timeout, $reactive, $mdDialog, $auth) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

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

		$ctrl.open = function (ev) {

			if (!$auth.isLoggedIn()) {
				return;
			}

			console.log({
				topicId: $ctrl.topicId,
				category: $ctrl.category,
				article: $ctrl.article,
			})

			$mdDialog.show({
				controller: 'ArticleModalCtrl as $ctrl',
				templateUrl: materialModalTemplate,
				// parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false,
				fullscreen: false,// Only for -xs, -sm breakpoints.
				locals: {
					topicId: $ctrl.topicId,
					category: $ctrl.category,
					article: $ctrl.article,
				},
			})
				.then(function (answer) {
					console.log('You answered the dialog.')
					//					      $scope.status = 'You said the information was "' + answer + '".';
				}, function () {
					console.log('You cancelled the dialog.')
					//					      $scope.status = 'You cancelled the dialog.';
				})


		};

	}
}

export default angular.module('yourpers.articleActions', [
	angularMeteor,
	materialModalCtrl,
])
	.component('yourpersArticleActions', {
		templateUrl: template,
		controller: ArticleActionsCtrl,
		bindings: {
			topicId: '<',
			category: '<',
			article: '<',
		}
	}).name;