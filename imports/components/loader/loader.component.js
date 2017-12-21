import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loader.html';
import style from './loader.less';

class LoaderComponent {

	constructor($rootScope, $scope, $location) {
		'ngInject';

		$rootScope.initializedDatabase = false;

		var pageLoadCounter = 0;

		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			console.log('$routeChangeStart');
			$rootScope.stateIsLoading = true;
		});

		$rootScope.$on("$routeChangeSuccess", function (event, next, current) {
			console.log('$routeChangeSuccess');
			$rootScope.stateIsLoading = false;
		});

		// Hide the loader after back-button-press (or returning to the browser) on mobile devices
		function hideAllLoaders() {

			if (!$rootScope.initializedDatabase) {
				return;
			}

			$scope.$apply(function () {
				$rootScope.stateIsLoading = false;
			});

		}

		// event for returning via back button
		window.addEventListener("pageshow", function () {
			console.log('pageshow');
			hideAllLoaders();

		}, false);

		// event for returning via back button
		window.addEventListener("onpageshow", function () {
			console.log('onpageshow');
			hideAllLoaders();

		}, false);

		// event for returning to the browser
		window.addEventListener("focus", function () {
			console.log('focus');
			hideAllLoaders();

		}, false);

	}

}

export default {
	templateUrl: template,
	controller: LoaderComponent,
}