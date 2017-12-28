import template from './first-use-toast.html';

export default class FirstUseToast {

	static factory($rootElement, $mdToast) {
		'ngInject';
		return new FirstUseToast($mdToast, $rootElement);
	}

	constructor($mdToast, $rootElement) {
		this.$mdToast = $mdToast;
		this.$rootElement = $rootElement;
	}

	show() {
		console.log(this.$rootElement)
		
		// should be the same pixel value as the desktopviewer component
		if (this.$rootElement[0].clientWidth > 600) {
			return;
		}
		this.$mdToast.show({
			hideDelay: 10000,
			position: 'bottom',
			controller: 'FirstUseToastComponent',
			templateUrl: template,
			parent: this.$rootElement[0]
		});
	};

}