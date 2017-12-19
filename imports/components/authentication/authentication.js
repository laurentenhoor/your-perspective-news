import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './authentication.html';
import { name as DisplayNameFilter } from '/imports/filters/displayName';

const name = 'authentication';

class AuthenticationCtrl {
	constructor($scope, $rootScope, $reactive) {
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

			$rootScope.stateIsLoading = true;
			$rootScope.initializedDatabase = false;

			Meteor.loginWithLinkedIn({}, (err) => {

				if (err) {
					// handle error
				} else {
					// successful login!
				}

			});
		}

		$ctrl.logout = function() {
			
			console.log('logout and stateIsLoading to true')
			
			$rootScope.stateIsLoading = true;
			$rootScope.initializedDatabase = false;
			
			Accounts.logout(function() {
				$rootScope.stateIsLoading = false;
				$rootScope.initializedDatabase = false;
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