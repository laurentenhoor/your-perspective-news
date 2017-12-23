import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './authentication.html';
import { name as DisplayNameFilter } from '/imports/filters/displayName';

const name = 'authentication';

class AuthenticationCtrl {
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

//create a module
export default angular.module(name, [
	angularMeteor,
	DisplayNameFilter
	]).component(name, {
		templateUrl: template,
		controller: AuthenticationCtrl
	});