import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import yourpersMenu from '../imports/components/menu/menu';
import yourpersOverview from '../imports/components/overview/overview';
import yourpersTopic from '../imports/components/topic/topic';
import yourpersPosts from '../imports/components/post/post';
import yourpersFeedback from '../imports/components/feedback/feedback';
import yourpersLoader from '../imports/components/loader/loader';
import yourpersItem from '../imports/components/item/item';

import '../imports/startup/accounts-config.js';

import template from './main.html';


angular.module('yourpers', [
	
	angularMeteor,
	angularRoute,
	
	yourpersLoader.name,
	yourpersMenu.name,
	yourpersOverview.name,
	yourpersTopic.name,
	yourpersPosts.name,
	yourpersFeedback.name,
	yourpersItem.name,
	
	'accounts.ui'
	
])

.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
	    when('/overview', {
	      template: '<yourpers-overview></yourpers-overview>'
	    }).
	    when('/topic', {
	      template: '<yourpers-topic></yourpers-topic>'
	    }).
	    when('/nieuws', {
		      template: '<yourpers-post></yourpers-post>'
	    }).
	    when('/item/:id', {
	    		template: '<yourpers-item></yourpers-item>'
	    }).
	    otherwise('/nieuws');
	
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
}]);