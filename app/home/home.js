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
		summaryText : 'President Donald Trump haalt de Verenigde Staten definitief uit het klimaatakkoord van Parijs. Volgens Trump is het akkoord \'een slechte deal\' voor de Amerikaanse burgers en \'niet eerlijk\' voor Amerika. Ook zou het miljoenen banen gaan kosten. Trump zegt vier jaar de tijd te zullen nemen om zich terug te trekken.',
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