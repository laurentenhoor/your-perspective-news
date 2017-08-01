import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loader.html';
import style from './loader.less';

class LoaderCtrl {

	constructor($rootScope, $scope, $location) {

		$rootScope.stateIsLoading = true;

		$rootScope.$on( "$routeChangeStart", function(event, next, current) {
			$rootScope.stateIsLoading = true;
		});

		$rootScope.$on( "$routeChangeSuccess", function(event, next, current) {
			$rootScope.stateIsLoading = false;
		});

		// Hide the loader after back-button-press (or returning to the browser) on mobile devices
		function hideAllLoaders() {
			$rootScope.stateIsLoading = false;
			$scope.$apply();
		}
		
		// event for returning via back button
		window.addEventListener("pageshow", function() {
			hideAllLoaders();
		}, false);
		
		// event for returning to the browser
		window.addEventListener("focus", function() {
			hideAllLoaders();
		}, false);
		
	}

}

export default angular.module('yourpers.loader', [
	angularMeteor
	])
	.component('yourpersLoader', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$location', LoaderCtrl]
	})

	.directive('extLink', ['$rootScope', function($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, elem) {
				elem.bind('click', function(e) {
					
					$rootScope.$apply(function() {
						$rootScope.stateIsLoading = true;
					});
					
				});
			}
		};
	}]);