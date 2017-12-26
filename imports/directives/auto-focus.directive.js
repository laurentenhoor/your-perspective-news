import angular from 'angular';
import angularMeteor from 'angular-meteor';

class AutoFocus {

	constructor($timeout) {
		'ngInject';

		this.restrict = 'A';
		this.link = function($scope, $element, $attrs) {
		
			$timeout(() => $element[0].focus());

		}

	}
}

export default
	angular.module('autoFocusDirective', [])
	.directive('autoFocus',['$timeout',
		($timeout) => new AutoFocus($timeout)]
	).name;