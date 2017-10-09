import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import yourpersMenu from '../imports/components/menu/menu';
import yourpersPosts from '../imports/components/post/post';
import yourpersFeedback from '../imports/components/feedback/feedback';
import yourpersLoader from '../imports/components/loader/loader';
import yourpersItem from '../imports/components/item/item';

// Deprecated
import yourpersOverview from '../imports/components/deprecated/overview/overview';
import yourpersTopic from '../imports/components/deprecated/topic/topic';

import '../imports/startup/accounts-config.js';

import template from './main.html';


angular.module('yourpers', [
	
	angularMeteor,
	angularRoute,
	
	yourpersLoader.name,
	yourpersMenu.name,
	yourpersPosts.name,
	yourpersFeedback.name,
	yourpersItem.name,
	
	// Deprecated
	yourpersOverview.name,
	yourpersTopic.name,
	
	'accounts.ui'
	
])

.config(['$locationProvider', '$routeProvider', '$httpProvider', '$provide', function($locationProvider, $routeProvider, $httpProvider, $provide) {
  
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
	    when('/nieuws', {
		      template: '<yourpers-post></yourpers-post>'
	    }).
	    when('/item/:id', {
	    		template: '<yourpers-item></yourpers-item>'
	    }).
	    
	    // Deprecated
	    when('/overview', {
		      template: '<yourpers-overview></yourpers-overview>'
	    }).
	    when('/topic', {
	      template: '<yourpers-topic></yourpers-topic>'
	    }).
	    
	    otherwise('/nieuws');
	
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
//    $locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
    
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