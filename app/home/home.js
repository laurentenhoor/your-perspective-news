'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', function($scope) {
	
	$scope.newsItems = [{
		id : 1,
		title: 'VS stapt uit klimaatakkoord',
		category: 'buitenland'
	}, {
		id : 2,
		title: 'Crisis Qatar',
		category: 'buitenland'
	}, {
		id : 3,
		title: 'Verkiezingen Frankrijk',
		category: 'buitenland'
	}, {
		id : 4,
		title: 'Formatieonderhandelingen',
		category: 'politiek'
	}, {
		id : 5,
		title: 'Nederland belastingparadijs',
		category: 'economie'
	}, {
		id : 6,
		title: 'Overlijden Savannah',
		category: 'binnenland'
	}, {
		id : 7,
		title: 'Oranje op WK',
		category: 'sport'
	}, {
		id : 8,
		title: 'Beschermingsconstructie AkzoNobel',
		category: 'economie'
	}];
	

}]);