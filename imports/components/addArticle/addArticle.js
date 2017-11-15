import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularBootstrap from 'angular-ui-bootstrap';

import modalTemplate from './addArticleModal.html';
import modalCtrl from './addArticleModal.js';

import template from './addArticle.html';
import style from './addArticle.less';


class AddArticleCtrl {
	
	constructor($rootScope, $scope, $reactive, $window, $uibModal) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
	
		$ctrl.open = function () {
			
			var modalInstance = $uibModal.open({
				animation: false,
				templateUrl: modalTemplate,
				controller: 'ModalInstanceCtrl',
				controllerAs: '$ctrl'
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
	angularBootstrap
	])
	.component('yourpersAddArticle', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$window','$uibModal', AddArticleCtrl]
	});