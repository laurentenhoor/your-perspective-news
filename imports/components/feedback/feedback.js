import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularBootstrap from 'angular-ui-bootstrap';

import modalCtrl from './modal.js';

import template from './feedback.html';
import style from './feedback.less';

class FeedbackCtrl {
	
	constructor($scope, $document, $uibModal) {

		var $ctrl = this;
		
		$ctrl.items = ['item1', 'item2', 'item3'];

		$ctrl.animationsEnabled = false;

		$ctrl.open = function (size, parentSelector) {
	
			var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
				controllerAs: '$ctrl',
				size: size,
				appendTo: parentElem,
				resolve: {
					items: function () {
						return $ctrl.items;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$ctrl.selected = selectedItem;
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
			});

		}

	}

}

export default angular.module('allpers.feedback', [
	angularMeteor, angularBootstrap, modalCtrl.name,
	])

	.component('allpersFeedback', {
		templateUrl : template,
		controller: ['$scope', '$document', '$uibModal', FeedbackCtrl]
	});
