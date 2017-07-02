'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.topic',
  'myApp.version'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/topic'});
}])

.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
	
	$scope.isActive = function(viewLocation) {
	    return viewLocation === $location.path();
	};;
	
}]);