import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

export default class AuthService {

	constructor($dialog, $loader, $rootScope) {
		'ngInject';

		console.log('init AuthService')

		let self = this;
		self.loginStyle = 'popup';

		function getLoginStyle() {
			return self.loginStyle;
		}
		function setLoginStyle(style) {
			self.loginStyle = style
			$rootScope.$broadcast("updates");
		}

		return {
			isLoggedIn: () => {

				if (!Meteor.user()) {

					var confirmModal = $dialog.confirm()
						.title('Log in met LinkedIn')
						.textContent(`Wij streven naar eerlijke discussies tussen echte mensen.`)
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
			},
			logout: () => {
				ga('send', {
					hitType: 'event',
					eventCategory: 'Account',
					eventAction: 'logout',
					eventLabel: '/user/' + Meteor.userId()
				})

				$loader.startAndWait(() =>
					Accounts.logout(() =>
						$loader.stop()))
			},
			login: () => {
				console.log('login with style:', getLoginStyle())
				Meteor.loginWithLinkedIn({
					loginStyle: getLoginStyle()
				}, (error) => {
					if (error) { console.error(error); }
					callback()
				});
			},
			setLoginStyle: (style) => {
				console.log('current loginStyle', getLoginStyle())
				console.log('set loginStyle to', style)
				setLoginStyle(style);
				console.log('current loginStyle after change', getLoginStyle())
			},
			getLoginStyle: getLoginStyle
		}

	}

}