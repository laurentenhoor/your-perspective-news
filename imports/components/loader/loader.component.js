import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loader.html';
import style from './loader.less';

class LoaderComponent {

	constructor($rootScope, $scope, $reactive, $location, loaderService, $timeout) {
		'ngInject';
	
		this.loaderService = loaderService;
		setupEventListeners($rootScope, window, loaderService);
		
	}

}

function setupEventListeners($rootScope, window, loaderService) {
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		console.log('$routeChangeStart');
		loaderService.start();
	});
	
	$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
		console.log('$routeChangeSuccess');
		loaderService.stop();
	});
	
	window.addEventListener("pageshow", function () {
		console.log('pageshow');
		loaderService.stop();
	}, false);
	
	window.addEventListener("onpageshow", function () {
		console.log('onpageshow');
		loaderService.stop();
	}, false);
	
	window.addEventListener("focus", function () {
		console.log('focus');
		// loaderService.stop();
	}, false);
}

export default {
	templateUrl: template,
	controller: LoaderComponent,
}