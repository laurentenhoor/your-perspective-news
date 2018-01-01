import FirstUseToastTemplate from './first-use-toast.html';
import FirstUseToastComponent from './first-use-toast.component';

export default class FirstUseToastService {

	constructor($mdToast, $rootElement) {
		'ngInject';

		this.$mdToast = $mdToast;
		this.$rootElement = $rootElement;
	}

	hide() {
		this.$mdToast.hide();
	}

	show() {
		this.$mdToast.show({
			controller: FirstUseToastComponent,
			templateUrl: FirstUseToastTemplate,
			controllerAs: '$ctrl',
			hideDelay: 12000,
			position: 'bottom',
		});
	};

}