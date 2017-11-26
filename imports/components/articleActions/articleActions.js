import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularBootstrap from 'angular-ui-bootstrap';

import modalTemplate from './articleModal.html';
import {name as modalCtrl} from './articleModal.js';

import template from './articleActions.html';
import style from './articleActions.less';


class ArticleActionsCtrl {
	
	constructor($rootScope, $scope, $reactive, $uibModal) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.articleData = null;
		$ctrl.isEditMode = false;
		
		$ctrl.$onChanges = function(changes) {
		// Explaination: https://medium.com/front-end-hacking/angularjs-component-binding-types-my-experiences-10f354d4660
			if (changes.data && $ctrl.data) {
				$ctrl.articleData = angular.copy($ctrl.data);	
				$ctrl.articleData.topicId = angular.copy($ctrl.topicId);
				$ctrl.isEditMode = angular.copy($ctrl.isEditMode);
			}
		}
		
		$ctrl.open = function () {
			
			console.log($ctrl.articleData);
			console.log($ctrl.isEditMode);
			
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: modalTemplate,
				controller: 'ArticleModalCtrl',
				controllerAs: '$ctrl',
				resolve : {
					articleData : function() {return $ctrl.articleData},
					isEditMode : function() {return $ctrl.isEditMode}
				}
			});

			modalInstance.result.then(function (feedback) {
				console.log('do something with: '+feedback);
				$rootScope.sortBy = 'createdAt';
				
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
			});

		}
		
	}	
}

export default angular.module('yourpers.articleActions', [
	angularMeteor,
	angularBootstrap,
	modalCtrl
	])
	.component('yourpersArticleActions', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$uibModal', ArticleActionsCtrl],
		bindings: {
			data : '<',
			topicId : '<',
			isEditMode : '<'
		}
	});