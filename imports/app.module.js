import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import angularMaterial from 'angular-material';
import angularMaterialStyle from '/node_modules/angular-material/angular-material.css';

import componentsModule from './components/components.module'
import commonModule from './common/common.module'

import appComponent from './app.component';

angular.module('yourpers', [
	
	angularMeteor,
	angularRoute,
	angularMaterial,

	commonModule,
    componentsModule,
	
])

.component('yourpers', appComponent)

.config(['$locationProvider', '$routeProvider', '$httpProvider', '$provide', '$sceDelegateProvider', function(
		$locationProvider, $routeProvider, $httpProvider, $provide, $sceDelegateProvider) {
	
	$sceDelegateProvider.resourceUrlWhitelist(['**']);

	$routeProvider.
	    when('/nieuws', {
    		template: '<yourpers-bulletin></yourpers-bulletin>'
	    }).
	    
	    // Deprecated
	    when('/overview', {
		      template: '<yourpers-overview></yourpers-overview>'
	    }).
	    when('/topic', {
	      template: '<yourpers-topic></yourpers-topic>'
	    }).
	    when('/tijdslijn', {
		      template: '<yourpers-post></yourpers-post>'
	    }).
	    when('/item/:id', {
	    		template: '<yourpers-item></yourpers-item>'
	    }).
	    when('/bundle', {
  		template: '<yourpers-bundle></yourpers-bundle>'
	    }).
	    
	    otherwise('/nieuws');
	
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    $locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
    
    $provide.decorator('$browser', ['$delegate', function($delegate) {
        var originalUrl = $delegate.url;
        $delegate.url = function() {
            var result = originalUrl.apply(this, arguments);
            if (result && result.replace) {
                result = result.replace(/%23/g, '#');
            }
            return result;
        };
        return $delegate;
    }]);
    
}]);