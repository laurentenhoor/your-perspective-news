import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import allpersMenu from '../imports/components/menu/menu';
import allpersOverview from '../imports/components/overview/overview';
import allpersTopic from '../imports/components/topic/topic';
import allpersChat from '../imports/components/chat/chat';

import template from './main.html';

import ngSidebarJs from 'angular-sidebarjs';
import 'sidebarjs/dist/sidebarjs.css';

angular.module('allpers', [
                           
	angularMeteor,
	angularRoute,
	
	allpersMenu.name,
	allpersOverview.name,
	allpersTopic.name,
	allpersChat.name,
	
	ngSidebarJs
	
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
	    when('/news', {
	      template: '<allpers-overview></allpers-overview>'
	    }).
	    when('/topic', {
	      template: '<allpers-topic></allpers-topic>'
	    }).
	    otherwise('/news');
	
}]);