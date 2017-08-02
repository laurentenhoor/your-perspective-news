import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularBootstrap from 'angular-ui-bootstrap';

import template from './feedback.html';
import style from './feedback.less';

import modalTemplate from './modal.html';
import modalCtrl from './modal.js';

import { Feedback } from '../../api/feedback.js';
import { Meteor } from 'meteor/meteor';

class FeedbackCtrl {
	
	constructor($rootScope, $scope, $document, $uibModal) {

		var $ctrl = this;

		$ctrl.open = function () {
	
			var modalInstance = $uibModal.open({
				animation: false,
				templateUrl: modalTemplate,
				controller: 'ModalInstanceCtrl',
				controllerAs: '$ctrl'
			});

			// At clicking the Send button receive the feedback here...
			modalInstance.result.then(function (feedback) {
				
				// Create new feedback entry in db
				Feedback.insert({
					ownerId: Meteor.userId(),
					ownerName : Meteor.user().username,
//					email: Meteor.user() ? Meteor.user().emails[0].address : 'null',
					ip: $rootScope.ip,
					feedback: feedback
				}, function() {
					alert('Bedankt voor je reactie!');
				});
			
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
			});

		}

	}

}

export default angular.module('yourpers.feedback', [
	angularMeteor, angularBootstrap, modalCtrl.name,
	])

	.component('yourpersFeedback', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$document', '$uibModal', FeedbackCtrl]
	});
