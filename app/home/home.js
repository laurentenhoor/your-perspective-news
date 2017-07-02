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
		title: 'VS stapt uit klimaatakkoord'
	}, {
		id : 2,
		title: 'Asha gaat naar Madeira'
	}];
	

}]);