import angular from 'angular';
import angularMeteor from 'angular-meteor'

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './auth.html';
import style from './auth.less';

class AuthComponent {
	constructor($scope, $rootScope, $reactive, $loader) {
		'ngInject';

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

			$loader.start();
			Meteor.loginWithLinkedIn();
			
		}

		$ctrl.logout = function() {

			$loader.startAndWait(() => 
				Accounts.logout(() => 
					$loader.stop()))

		}
		
	}
	
}

export default {
		templateUrl: template,
		controller: AuthComponent
	};