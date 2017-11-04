import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import {name as yourpersMenu} from '../imports/components/menu/menu';
import {name as yourpersPosts} from '../imports/components/post/post';
import {name as yourpersFeedback} from '../imports/components/feedback/feedback';
import {name as yourpersLoader} from '../imports/components/loader/loader';
import {name as yourpersItem} from '../imports/components/item/item';

import {name as yourpersBundle} from '../imports/components/bundle/bundle';

// Deprecated
import {name as yourpersOverview} from '../imports/components/deprecated/overview/overview';
import {name as yourpersTopic} from '../imports/components/deprecated/topic/topic';

import '../imports/startup/accounts-config.js';


angular.module('yourpers', [
	
	angularMeteor,
	angularRoute,
	
	yourpersLoader,
	yourpersMenu,
	yourpersPosts,
	yourpersFeedback,
	yourpersItem,
	
	yourpersBundle,
	
	// Deprecated
	yourpersOverview,
	yourpersTopic,
	
	'accounts.ui'
	
])

.config(['$locationProvider', '$routeProvider', '$httpProvider', '$provide', function(
		$locationProvider, $routeProvider, $httpProvider, $provide) {
  
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
	    when('/nieuws', {
		      template: '<yourpers-post></yourpers-post>'
	    }).
	    when('/item/:id', {
	    		template: '<yourpers-item></yourpers-item>'
	    }).
		    when('/bundle', {
	    		template: '<yourpers-bundle></yourpers-bundle>'
	    }).
	    
	    // Deprecated
	    when('/overview', {
		      template: '<yourpers-overview></yourpers-overview>'
	    }).
	    when('/topic', {
	      template: '<yourpers-topic></yourpers-topic>'
	    }).
	    
	    otherwise('/bundle');
	
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