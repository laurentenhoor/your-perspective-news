import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loader.html';
import style from './loader.less';

class LoaderCtrl {

	constructor($rootScope, $scope, $location) {

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

export default
	angular.module('yourpers.loader', [
		angularMeteor
	])
		.directive('extLink', ['$rootScope', '$location', '$window', '$anchorScroll', function ($rootScope, $location, $window, $anchorScroll) {
			return {
				restrict: 'A',
				link: function (scope, elem) {
					elem.bind('click', function (e) {

						e.preventDefault();
						e.stopPropagation();

						$rootScope.$apply(function () {
							$rootScope.stateIsLoading = true;
						});

						var idHash = $(e.srcElement.parentElement).data('id');

						$location.hash(idHash);
						$anchorScroll();

						$location.replace();

						$window.history.pushState(null, 'any', $location.absUrl());

						console.log(e.srcElement);
						//					$window.location.href = e.srcElement.parentElement.href;


					});
				}
			};
		}])
		.component('yourpersLoader', {
			templateUrl: template,
			controller: ['$rootScope', '$scope', '$location', LoaderCtrl]
		}).name;