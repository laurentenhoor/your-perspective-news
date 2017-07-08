'use strict';

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngRoute from 'angular-route';
import homeComponent from '../imports/components/home/home';
import topicComponent from '../imports/components/topic/topic';
import template from './main.html';

// Declare app level module which depends on views, and components
angular.module('allpers', [
	angularMeteor,
	ngRoute,
	homeComponent.name,
	topicComponent.name
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
	$locationProvider.hashPrefix('!');
	$routeProvider.otherwise({redirectTo: '/home'});
	
}])

.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
	
	$scope.isActive = function(viewLocation) {
	    return viewLocation === $location.path();
	};;
	
}]);