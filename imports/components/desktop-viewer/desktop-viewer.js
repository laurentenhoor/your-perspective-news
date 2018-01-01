import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './desktop-viewer.html';
import style from './desktop-viewer.styl';

class DesktopViewerCtrl {

	constructor($window, $scope) {
		'ngInject';

		var $ctrl = this;

		$ctrl.showMobile = false;
		
		angular.element($window).bind('resize', function(){
			$scope.$apply(function() {
				checkWindowSize();	
			});
		});
		
		function checkWindowSize() {
			
			var windowSize = $window.innerWidth;
			
			if (windowSize < 600) {
				$ctrl.showMobile = true;
			} else {
				$ctrl.showMobile = false;
			};
		
		}
		checkWindowSize();
		
	}

}

export default angular.module('desktopViewer', [
	angularMeteor,
	])
	.component('desktopViewer', {
		templateUrl : template,
		controller: DesktopViewerCtrl,
		transclude : true,
	}).name;