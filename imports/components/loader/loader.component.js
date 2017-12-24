import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loader.html';
import style from './loader.less';

class LoaderComponent {

	constructor($rootScope, $scope, $reactive, $location, $loader, $timeout) {
		'ngInject';

		this.loader = $loader; 
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

	// Event for returning via back button
	window.addEventListener('pageshow', function() {
		console.log('pageshow');
		$loader.stop();
	}, false);

	// Listen to both pageshow and popstate for page navigations
	// Since popstate events are not always fired when navigating between
	// pages, listen to the pageshow event as well.
	window.addEventListener('popstate', function() {
		console.log('popstate');
		$loader.stop();
	}, false);

	// event for returning to the browser
	window.addEventListener("focus", function() {
		console.log('focus');
		$loader.stop();
	}, false);

}

export default {
	templateUrl: template,
	controller: LoaderComponent,
}