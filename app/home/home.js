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
		category: 'buitenland',
		summaryText : 'The classic cache problem. Unless told otherwise (by the webserver) the browser is going to cache assets based on the files name. So when it sees the same script/style/image with the same name it will 304 and serve the cached version.',
		imgUrl: 'http://static1.persgroep.net/volkskrant/image/b4aa7e95-4f6c-4d5a-9746-911858b73046?width=664&height=374',
		logoUrls : ['assets/logos/europa_nu.png','assets/logos/nos.png','assets/logos/business_insider.png','assets/logos/volkskrant.png','assets/logos/nrc.png','assets/logos/bbc.png','assets/logos/dumpert.png','assets/logos/fox_news.png','assets/logos/elsevier.png']
	}];
	
//	, {
//		id : 2,
//		title: 'Crisis Qatar',
//		category: 'buitenland',
//		summaryText : 'test',
//		imgUrl: '',
//		logoUrls : []
//	}, {
//		id : 3,
//		title: 'Verkiezingen Frankrijk',
//		category: 'buitenland'
//	}, {
//		id : 4,
//		title: 'Formatieonderhandelingen',
//		category: 'politiek'
//	}, {
//		id : 5,
//		title: 'Nederland belastingparadijs',
//		category: 'economie'
//	}, {
//		id : 6,
//		title: 'Overlijden Savannah',
//		category: 'binnenland'
//	}, {
//		id : 7,
//		title: 'Oranje op WK',
//		category: 'sport'
//	}, {
//		id : 8,
//		title: 'Beschermingsconstructie AkzoNobel',
//		category: 'economie'
//	}];
	

}]);