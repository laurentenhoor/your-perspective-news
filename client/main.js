import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import {name as yourpersMenu} from '../imports/components/menu/menu';
import {name as yourpersFeedback} from '../imports/components/feedback/feedback';
import {name as yourpersBulletin} from '../imports/components/bulletin/bulletin';

import '../imports/startup/accounts-config.js';

// Deprecated
import {name as yourpersPosts} from '../imports/components/post/post';
import {name as yourpersLoader} from '../imports/components/loader/loader';
import {name as yourpersItem} from '../imports/components/item/item';
import {name as yourpersBundle} from '../imports/components/bundle/bundle';

// Deeply Deprecated
import {name as yourpersOverview} from '../imports/components/deprecated/overview/overview';
import {name as yourpersTopic} from '../imports/components/deprecated/topic/topic';



angular.module('yourpers', [
	
	angularMeteor,
	angularRoute,
	
	yourpersLoader,
	yourpersMenu,
	yourpersBulletin,
	
	// Deprecated
	yourpersPosts,
	yourpersFeedback,
	yourpersItem,
	yourpersBundle,
	
	// Deeply Deprecated
	yourpersOverview,
	yourpersTopic,
	
	'accounts.ui'
	
])

.config(['$locationProvider', '$routeProvider', '$httpProvider', '$provide', '$sceDelegateProvider', function(
		$locationProvider, $routeProvider, $httpProvider, $provide, $sceDelegateProvider) {
	
	$sceDelegateProvider.resourceUrlWhitelist(['**']);
  
	$locationProvider.hashPrefix('!');
	
	$routeProvider.
	    when('/tijdslijn', {
		      template: '<yourpers-post></yourpers-post>'
	    }).
	    when('/item/:id', {
	    		template: '<yourpers-item></yourpers-item>'
	    }).
		    when('/bundle', {
	    		template: '<yourpers-bundle></yourpers-bundle>'
	    }).
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