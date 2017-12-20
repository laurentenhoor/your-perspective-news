import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './desktop-viewer.html';
import style from './desktop-viewer.less';


class DesktopViewerCtrl {

	constructor($rootScope, $scope, $reactive) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
	}

}

export default angular.module('desktopViewer', [
	angularMeteor,
	])
	.component('desktopViewer', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', DesktopViewerCtrl],
	}).name;