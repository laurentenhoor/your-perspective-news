import angular from 'angular';

export default class AccountMenuService {

	constructor($timeout, $mdSidenav, $scrollDisabler) {
		'ngInject';

		$timeout(() => setupListeners());

		return {
			toggle: toggle
		}
		
		function toggle() {

			return $mdSidenav('account-menu').toggle().then(() => {
				if ($mdSidenav('account-menu').isOpen()) {
					$scrollDisabler.disable();
				}
					
			});

		}

		function setupListeners() {
			$mdSidenav('account-menu').onClose(function() {
				$scrollDisabler.enable();
			});
	
		}

	}

}