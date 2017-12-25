import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import angularMaterial from 'angular-material';
import angularMaterialStyle from '/node_modules/angular-material/angular-material.css';

import componentsModule from './components/components.module'
import commonModule from './common/common.module'
import deprecatedModule from './deprecated/deprecated.module'

import appComponent from './app.component';

angular.module('yourpers', [
	
	angularMeteor,
	angularMaterial,
	angularRoute,

	componentsModule,
	commonModule,
	// deprecatedModule,
	
])

.component('yourpersApp', appComponent)

.config(($routeProvider, $locationProvider, $sceDelegateProvider) => {
	'ngInject';

	$routeProvider.
	    when('/nieuws', {
    		template: '<yourpers-bulletin></yourpers-bulletin>'
	    }).
	    otherwise('/nieuws');
	
	$locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
	$sceDelegateProvider.resourceUrlWhitelist(['**']);

	// $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];	
    
});