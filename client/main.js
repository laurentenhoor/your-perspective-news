import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import allpersMenu from '../imports/components/menu/menu';
import allpersOverview from '../imports/components/overview/overview';
import allpersTopic from '../imports/components/topic/topic';
import allpersPosts from '../imports/components/post/post';
import allpersFeedback from '../imports/components/feedback/feedback';
import allpersLoader from '../imports/components/loader/loader';
import allpersItem from '../imports/components/item/item';

import '../imports/startup/accounts-config.js';

import template from './main.html';


angular.module('allpers', [
	
	angularMeteor,
	angularRoute,
	
	allpersLoader.name,
	allpersMenu.name,
	allpersOverview.name,
	allpersTopic.name,
	allpersPosts.name,
	allpersFeedback.name,
	allpersItem.name,
	
	
	'accounts.ui'
	
])

.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
	    when('/overview', {
	      template: '<allpers-overview></allpers-overview>'
	    }).
	    when('/topic', {
	      template: '<allpers-topic></allpers-topic>'
	    }).
	    when('/nieuws', {
		      template: '<allpers-post></allpers-post>'
	    }).
	    when('/item/:id', {
	    		template: '<allpers-item></allpers-item>'
	    }).
	    otherwise('/nieuws');
	
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	
}]);