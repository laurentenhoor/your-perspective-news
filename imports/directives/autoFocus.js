import angular from 'angular';
import angularMeteor from 'angular-meteor';

var name = "autoFocus";

export default angular.module(name, [
	angularMeteor
	]).directive(name, [
		'$timeout', function($timeout) {
			
			return function(scope, element, attrs) {
				
				console.log('autoFocus Directive initiated');
		    	
		    	console.log(element);
		    	console.log(scope);
		    	console.log(attrs);
		    	
		    	$timeout(function() {
		    		 element[0].focus();
		    	 });
				
			}
		}
	]);