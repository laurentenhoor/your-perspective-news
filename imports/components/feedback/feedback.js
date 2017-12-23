import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';

import { Meteor } from 'meteor/meteor';

import { Feedback } from '/imports/api/feedback.js';

import template from './feedback.html';
import style from './feedback.less';

import modalTemplate from './modal.html';
import modalCtrl from './modal.js';


class FeedbackCtrl {

	constructor($rootScope, $scope, $document, $mdDialog) {
		'ngInject';

		var $ctrl = this;

		$ctrl.open = function ($event) {

			$mdDialog.show({
				controller: 'FeedbackModalCtrl as $ctrl',
				templateUrl: modalTemplate,
				parent: angular.element(document.body),
				targetEvent: $event,
				clickOutsideToClose: false,
				fullscreen: false,// Only for -xs, -sm breakpoints.
			})
				.then(function (feedback) {

					if (!feedback) {
						return;
					}

					console.log(Meteor.user())

					Feedback.insert({
						ownerId: Meteor.userId(),
						ownerName: Meteor.user() ? Meteor.user().profile.firstName : 'null',
						email: Meteor.user() ? Meteor.user().profile.emailAddress : 'null',
						ip: $rootScope.ip,
						feedback: feedback,

					}, function (error, _id) {

						if (error) {
							console.error(error);
							return;
						}
						console.log('sucessful insert with id: ' + _id);

						$mdDialog.show(
							$mdDialog.alert({
								onComplete: function afterShowAnimation() {
									var $dialog = angular.element(document.querySelector('md-dialog'));
									var $actionsSection = $dialog.find('md-dialog-actions');
									var $cancelButton = $actionsSection.children()[0];
									angular.element($cancelButton).addClass('md-raised');
								}
							})
								.parent(angular.element(document.body))
								.clickOutsideToClose(false)
								.title('Bedankt voor je reactie.')
								.textContent('Wij gaan hier zo snel mogelijk iets mee doen.')
								.ariaLabel('Feedback')
								.ok('Sluiten')
						);

					});
				}, function () {
					console.log('You cancelled the feedback dialog.');
				});

		}

	}

}

export default
	angular.module('feedback', [
		angularMeteor,
		angularMaterial,
		modalCtrl.name,
	]).component('feedback', {
		templateUrl: template,
		controller: FeedbackCtrl
	}).name;
