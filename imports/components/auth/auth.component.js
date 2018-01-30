import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

import template from './auth.html';
import style from './auth.styl';

class AuthComponent {
	constructor($scope, $rootScope, $reactive, $loader, $accountMenu, $timeout) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$timeout(()=>{
			ga('send', {
				hitType: 'event',
				eventCategory: 'Pageview',
				eventAction: Meteor.userId() ? 'Logged-in' : 'Anonymous',
				eventLabel: Meteor.userId() ? '/user/' + Meteor.userId() : null
			})
		},2000)

		$ctrl.helpers({
			isLoggedIn() {
				let userId = Meteor.userId();
				ga('set', 'userId', userId);
				ga('set', 'dimension1', userId);
				return !!userId
			},
			currentUser() {
				return Meteor.user();
			}
		});

		$ctrl.login = function () {

			$loader.start();

			ga('send', {
				hitType: 'event',
				eventCategory: 'Account',
				eventAction: 'Login'
			})

			Meteor.loginWithLinkedIn((error) => {
				$loader.stop()
			});

		}

		$ctrl.toggleAccountMenu = function () {
			$accountMenu.toggle();
		}
	}

}

export default {
	templateUrl: template,
	controller: AuthComponent,
};