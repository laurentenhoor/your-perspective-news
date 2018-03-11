import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

export default class AuthService {

	constructor($dialog, $loader, $rootScope, $desktopViewer) {
		'ngInject';
	
		return {
			login: login,
			logout: logout,
			isLoggedIn: isLoggedIn,
			isAdmin: isAdmin,
			isAnonymous: isAnonymous,
		}

		function login(callback) {
			Meteor.loginWithLinkedIn({
				loginStyle: ($desktopViewer.isDesktop() ? 'popup' : 'redirect')
			}, (error) => {
				if (error) { console.error(error); }
				callback()
			});
		}

		function logout() {

			ga('send', {
				hitType: 'event',
				eventCategory: 'Account',
				eventAction: 'logout',
				eventLabel: '/user/' + Meteor.userId()
			})

			$loader.startAndWait(() =>
				Accounts.logout(() =>
					$loader.stop()))

		}

		function isAnonymous() {
			if (Meteor.user()) {
				return Meteor.user().anonymous;
			}
			return true;
		}

		function isAdmin() {
			console.log('isAdmin in $auth')
			if (Meteor.user()) {
				console.log('user', Meteor.user())
				console.log('is role admin?', Roles.userIsInRole( Meteor.userId(), 'admin' ) )
				return Roles.userIsInRole( Meteor.userId(), 'admin' ); 
			} else {
				return false;
			}
		}

		function isLoggedIn() {
			if (!Meteor.user()) {

				var confirmModal = $dialog.confirm()
					.title('Log in met LinkedIn')
					.textContent(`Doe mee! Wij respecteren jouw privacy en delen niets zonder jouw toestemming.`)
					.ariaLabel('Log in met LinkedIn')
					.ok('Login')
					.cancel('Annuleren')

				$dialog.show(confirmModal).then(function () {
					login();
					return;
				}, function () {
					console.log('canceled login modal');
				});

				return false;
			} else {
				return true;
			}
		}
	}

}


