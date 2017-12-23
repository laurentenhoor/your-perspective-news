import angular from 'angular';
import angularMeteor from 'angular-meteor'

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './auth.html';

class AuthComponent {
	constructor($scope, $rootScope, $reactive, loaderService) {
		'ngInject';

		console.log('authentication init');

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.helpers({
			isLoggedIn() {
				return !!Meteor.userId();
			},
			currentUser() {
				return Meteor.user();
			}
		});
		
		$ctrl.login = function() {

			console.log('login');
			loaderService.start();

			Meteor.loginWithLinkedIn();

		}

		$ctrl.logout = function() {

			console.log('logout');			
			loaderService.start();
			
			Accounts.logout(function() {
				loaderService.stop();
			});
		}
		
	}
	
}

export default {
		templateUrl: template,
		controller: AuthComponent
	};