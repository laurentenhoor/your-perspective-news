import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loader.html';
import style from './loader.less';

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
		console.log('$routeChangeStart');
		$loader.start();
	});

	$rootScope.$on("$routeChangeSuccess", function (event, next, current) {
		console.log('$routeChangeSuccess');
		$loader.stop();
	});
	
}

export default {
	templateUrl: template,
	controller: LoaderComponent,
}