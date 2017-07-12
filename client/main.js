import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import allpersMenu from '../imports/components/menu/menu';
import allpersOverview from '../imports/components/overview/overview';
import allpersTopic from '../imports/components/topic/topic';
import allpersChat from '../imports/components/chat/chat';

import template from './main.html';

angular.module('allpers', [
                           
	angularMeteor,
	angularRoute,
	
	allpersMenu.name,
	allpersOverview.name,
	allpersTopic.name,
	allpersChat.name
	
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
	    when('/overview', {
	      template: '<allpers-overview></allpers-overview>'
	    }).
	    when('/topic', {
	      template: '<allpers-topic></allpers-topic>'
	    }).
	    otherwise('/overview');
	
}]);