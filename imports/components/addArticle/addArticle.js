import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularBootstrap from 'angular-ui-bootstrap';

import modalTemplate from './addArticleModal.html';
import {name as modalCtrl} from './addArticleModal.js';

import template from './addArticle.html';
import style from './addArticle.less';


class AddArticleCtrl {
	
	constructor($scope, $reactive, $uibModal) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.articleData = null;
		
		$ctrl.$onChanges = function(changes) {
		// Explaination: https://medium.com/front-end-hacking/angularjs-component-binding-types-my-experiences-10f354d4660
			if (changes.data) {
				$ctrl.articleData = angular.copy($ctrl.data);	
				console.log($ctrl.articleData)
			}
		}
		
		$ctrl.open = function () {
			
			if (!$ctrl.articleData) {
				console.error('Tried to open the modal before data was loaded.')
//				return;
			}
			
			console.log($ctrl.articleData)
			
			var modalInstance = $uibModal.open({
				animation: false,
				templateUrl: modalTemplate,
				controller: 'AddArticleModalCtrl',
				controllerAs: '$ctrl',
				resolve : {
					articleData : function() {return $ctrl.articleData}
				}
			});

			modalInstance.result.then(function (feedback) {
				console.log('do something with: '+feedback);
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
			});

		}
		
	}	
}

export default angular.module('yourpers.addArticle', [
	angularMeteor,
	angularBootstrap,
	modalCtrl
	])
	.component('yourpersAddArticle', {
		templateUrl : template,
		controller: ['$scope', '$reactive', '$uibModal', AddArticleCtrl],
		bindings: {
			data : '<'
		}
	});