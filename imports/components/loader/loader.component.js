import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loader.html';
import style from './loader.styl';

class LoaderComponent {

	constructor($rootScope, $scope, $reactive, $location, $loader, $timeout) {
		'ngInject';

		this.loader = $loader;
		this.isVisible = this.loader.isVisible();

		setupEventListeners($rootScope, window, $loader);
		
	}

}

function setupEventListeners($rootScope, window, $loader) {
	
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		// console.log('$routeChangeStart');
		$loader.start();
	});

	$rootScope.$on("$routeChangeSuccess", function (event, next, current) {
		// console.log('$routeChangeSuccess');
		$loader.stop();
	});

	window.addEventListener('visibilitychange', () => {
		// console.log('visibilitychange');
		// console.log(document.visibilityState);
		
		if (document.visibilityState == 'visible') {
			$loader.stop();
		}

	});

	window.addEventListener('pageshow', () => {
		$loader.stop();
	});
	
}

export default {
	templateUrl: template,
	controller: LoaderComponent,
}