import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularBootstrap from 'angular-ui-bootstrap';

import modalTemplate from './addArticleModal.html';
import {name as modalCtrl} from './addArticleModal.js';

import template from './addArticle.html';
import style from './addArticle.less';


class AddArticleCtrl {
	
	constructor($scope, $reactive, $uibModal, $attrs) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		console.log($attrs.data)
		
		var data = null;
		
		$ctrl.$onInit = function() {
			articleData = $ctrl.data;			
		}
		
		$ctrl.open = function () {
			
			if (!articleData) {
				console.error('Tried to open the modal before data was loaded.')
				return;
			}
			
			console.log(articleData)
			
			var modalInstance = $uibModal.open({
				animation: false,
				templateUrl: modalTemplate,
				controller: 'AddArticleModalCtrl',
				controllerAs: '$ctrl',
				resolve : {
					article : function() {return articleData;}
				}
			});

			modalInstance.result.then(function (feedback) {
				console.log('do something')
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
		controller: ['$scope', '$reactive', '$uibModal','$attrs', AddArticleCtrl],
		bindings: {
			data : '<'
		}
	});