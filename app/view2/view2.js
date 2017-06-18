'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
	$scope.newsItems = [{
		title : 'Het klimaat akkoord',
		articleUrl : '',
		imgUrl : '',
		logoUrl : '',
		summaryText : '',
		type : 'Read'
	}, {
		title : '0.3',
		articleUrl : '',
		imgUrl : '',
		logoUrl : '',
		summaryText : '',
		type : 'Read'
	}, {
		title : '',
		articleUrl : '',
		imgUrl : '',
		logoUrl : '',
		summaryText : '',
		type : 'Read'
	}];
}]);