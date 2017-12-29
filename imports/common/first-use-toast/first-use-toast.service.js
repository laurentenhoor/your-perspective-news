import FirstUseToastTemplate from './first-use-toast.html';
import FirstUseToastComponent from './first-use-toast.component';

export default class FirstUseToast {

	static factory($rootElement, $mdToast) {
		'ngInject';
		return new FirstUseToast($mdToast, $rootElement);
	}

	constructor($mdToast, $rootElement) {
		this.$mdToast = $mdToast;
		this.$rootElement = $rootElement;
	}

	hide() {
		this.$mdToast.hide();
	}

	show() {
		// should be the same pixel value as the desktopviewer component
		let iframeWidth = 600;

		if (this.$rootElement[0].clientWidth > iframeWidth) {
			console.warn('$mdToast is being blocked from showing at windows wider than ' + iframeWidth +'px');
			return;
		}

		this.$mdToast.show({
			hideDelay: 12000,
			position: 'bottom',
			controller: FirstUseToastComponent,
			controllerAs: '$ctrl',
			templateUrl: FirstUseToastTemplate,
			parent: this.$rootElement[0]
		});
		
	};

}