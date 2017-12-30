export default class AccountMenuService {

	static create($mdSidenav){
		'ngInject';
		return new AccountMenuService($mdSidenav);
	}

	constructor($mdSidenav) {
		'ngInject';

		return {
			toggle: toggle
		}

		function toggle() {
			return $mdSidenav('account-menu').toggle();
		}
	}

}