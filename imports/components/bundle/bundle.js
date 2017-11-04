import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './bundle.html';
import style from './bundle.less';


class BundleCtrl {
	
	constructor($rootScope, $scope, $reactive) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		
		
	}
	
	
	
}


export default angular.module('yourpers.bundle', [
	angularMeteor,
	])
	.component('yourpersBundle', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', BundleCtrl]
	})