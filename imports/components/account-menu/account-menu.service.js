import angular from 'angular';

export default class AccountMenuService {

	constructor($timeout, $mdSidenav) {
		'ngInject';

		$timeout(()=>setupListeners());

		return {
			toggle: toggle
		}
		
		function toggle() {

			return $mdSidenav('account-menu').toggle().then(() => {
				if ($mdSidenav('account-menu').isOpen()) {
					console.log('addClass');
					let bodyElement = angular.element(document.querySelector('body'));
					bodyElement.addClass('md-dialog-is-showing');
				}
					
			});

		}

		function setupListeners() {
			console.log('setSidenavListener');

			$mdSidenav('account-menu').onClose(function() {
				console.log('removeClass');
				let bodyElement = angular.element(document.querySelector('body'));
				bodyElement.removeClass('md-dialog-is-showing');
			});
	
		}

	}

}