import angular from 'angular';

export default class AccountMenuService {

	// static create($mdSidenav){
	// 	'ngInject';
	// 	return new AccountMenuService($mdSidenav);
	// }

	static constructor($mdSidenav) {
		'ngInject';

		let isOpen = false;

		return {
			toggle: toggle
		}

		function toggle() {
			isOpen = !isOpen;

			var bodyElement = angular.element(document.querySelector('body'));
			if (isOpen) {
				bodyElement.addClass('md-dialog-is-showing');
			} else {
				bodyElement.removeClass('md-dialog-is-showing');
			}
			
			return $mdSidenav('account-menu').toggle();
		}
	}

}