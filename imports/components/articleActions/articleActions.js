import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularBootstrap from 'angular-ui-bootstrap';

//import modalTemplate from './articleModal.html';
//import {name as modalCtrl} from './articleModal.js';

import materialModalTemplate from './articleMaterialModal.html';
import {name as materialModalCtrl} from './articleMaterialModal.js';

import template from './articleActions.html';
import style from './articleActions.less';


class ArticleActionsCtrl {
	
	constructor($rootScope, $scope, $reactive, $uibModal, $mdDialog) {
		
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
		
		$ctrl.open = function(ev) {
		    $mdDialog.show({
		      controller: 'ArticleModalCtrl as $ctrl',
		      templateUrl: materialModalTemplate,
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false,// Only for -xs, -sm breakpoints.
		      locals : {
					topicId : $ctrl.topicId,
					category : $ctrl.category,
					article : $ctrl.article,
		      },
		    })
		    .then(function(answer) {
//		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
//		      $scope.status = 'You cancelled the dialog.';
		    });
		  };
		
//		$ctrl.open = function () {
//				
//			var modalInstance = $uibModal.open({
//				animation: true,
//				templateUrl: modalTemplate,
//				controller: 'ArticleModalCtrl',
//				controllerAs: '$ctrl',
//				resolve : {
//					topicId : function() {return $ctrl.topicId},
//					category : function() {return $ctrl.category},
//					article : function() {return $ctrl.article},
//				}
//			});
//
//			modalInstance.result.then(function (feedback) {
//				console.log('do something with: '+feedback);
//				$rootScope.sortBy = 'createdAt';
//				
//			}, function () {
//				console.log('Modal dismissed at: ' + new Date());
//			});
//
//		}

		
	}		
}

export default angular.module('yourpers.articleActions', [
	angularMeteor,
	angularBootstrap,
	materialModalCtrl,
	
	])
	.component('yourpersArticleActions', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$uibModal', '$mdDialog', ArticleActionsCtrl],
		bindings: {
			topicId : '<',
			category : '<',
			article : '<',
		}
	});