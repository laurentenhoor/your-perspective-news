import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as CommentsTreeBuilder} from '../../services/CommentsTreeBuilder.js';

import template from './mobilePreview.html';
import style from './mobilePreview.less';


class MobilePreviewCtrl {

	constructor($rootScope, $scope, $reactive) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
	}

}


export default angular.module('yourpers.mobilePreview', [
	angularMeteor,
	])
	.component('yourpersMobilePreview', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', MobilePreviewCtrl],
	});