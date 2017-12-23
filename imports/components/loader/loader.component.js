import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loader.html';
import style from './loader.less';

class LoaderComponent {

	constructor($rootScope, $scope, $reactive, $location, $loader, $timeout) {
		'ngInject';

		this.$loader = $loader;
		setupEventListeners($rootScope, window, $loader);

	}

}

function setupEventListeners($rootScope, window, $loader) {
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		console.log('$routeChangeStart');
		$loader.start();
	});

	$rootScope.$on("$routeChangeSuccess", function (event, next, current) {
		console.log('$routeChangeSuccess');
		$loader.stop();
	});

	window.pageshow = (e) => {
		console.log('pageshow');
		$loader.stop();
	};

	window.onpageshow = (e) => {
		console.log('onpageshow');
		$loader.stop();
	};

	window.onfocus = (e) => {
		console.log('focus');
		// $loader.stop();
	}

	window.onbeforeunload = (e) => {
		console.log('onbeforeunload');
		$loader.start();
	};
}

export default {
	templateUrl: template,
	controller: LoaderComponent,
}