import template from './first-use-toast.html';

export default class FirstUseToast {

	static factory($mdToast) {
		'ngInject';
		return new FirstUseToast($mdToast);
	}

	constructor($mdToast) {
		this.$mdToast = $mdToast;
	}

	show() {
		this.$mdToast.show({
			hideDelay: 10000,
			position: 'bottom',
			controller: 'FirstUseToastComponent',
			templateUrl: template,
		});
	};

}