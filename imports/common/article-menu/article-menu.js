import angular from 'angular';
import angularMeteor from 'angular-meteor';

import materialModalTemplate from './article-dialog.html';
import {name as materialModalCtrl} from './article-dialog.js';

import {name as AuthService} from '/imports/services/AuthService';

import template from './article-menu.html';
import style from './article-menu.less';


class ArticleActionsCtrl {
	
	constructor($rootScope, $scope, $document, $timeout, $reactive, $mdDialog, AuthService) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.$onChanges = function(changes) {
		// Explaination: https://medium.com/front-end-hacking/angularjs-component-binding-types-my-experiences-10f354d4660
			if (changes.data && $ctrl.data) {
				$ctrl.topicId = angular.copy($ctrl.topicId);
				$ctrl.category = angular.copy($ctrl.category);	
				$ctrl.article = angular.copy($ctrl.article);
			}
			
		}
		

		$ctrl.blurAllInputs = function() {

			var inputs = $document[0].querySelectorAll('input');

			console.log(inputs);

			inputs.forEach(function(input) {
				console.log(input.name + ': ' + input.value);
				console.log(input);
				input.blur();

			});
		}

		
		$ctrl.open = function(ev) {
			
			if(!AuthService.isLoggedIn()) {
				return;
			}
			
			console.log("Start loading dialog window;")
			
			  $mdDialog.show({
			      controller: 'ArticleModalCtrl as $ctrl',
			      templateUrl: materialModalTemplate,
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:false,
			      fullscreen: false,// Only for -xs, -sm breakpoints.
			      locals : {
						topicId : $ctrl.topicId,
						category : $ctrl.category,
						article : $ctrl.article,
			      },
			    })
			    .then(function(answer) {
			    	console.log('You answered the dialog.')
//					      $scope.status = 'You said the information was "' + answer + '".';
			    }, function() {
			    	console.log('You cancelled the dialog.')
//					      $scope.status = 'You cancelled the dialog.';
			    })

			
		  };
		
	}		
}

export default angular.module('yourpers.articleActions', [
	angularMeteor,
	materialModalCtrl,
	AuthService,
	])
	.component('yourpersArticleActions', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$document', '$timeout', '$reactive', '$mdDialog', 'AuthService', ArticleActionsCtrl],
		bindings: {
			topicId : '<',
			category : '<',
			article : '<',
		}
	}).name;