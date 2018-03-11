import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

import template from './auth.html';
import style from './auth.styl';

class AuthComponent {
	constructor($scope, $rootScope, $reactive, $loader, $accountMenu, $timeout, $auth) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.helpers({
			isAdmin : () => {
                return $auth.isAdmin();
            }, 
            isAnonymous : () => {
                return $auth.isAnonymous();
            },
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

		$timeout(()=>{
			ga('send', {
				hitType: 'event',
				eventCategory: 'Pageview',
				eventAction: $ctrl.isAnonymous ? 'Anonymous' : 'Logged-in',
				eventLabel: Meteor.userId() ? '/user/' + Meteor.userId() : null
			})
		},2000)

		$ctrl.login = function () {

			if (!$ctrl.isAnonymous) {
				$auth.logout();
				return;
			}

			$loader.start();

			ga('send', {
				hitType: 'event',
				eventCategory: 'Account',
				eventAction: 'Login'
			})

			$auth.login(() => {
				$loader.stop()
			})
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