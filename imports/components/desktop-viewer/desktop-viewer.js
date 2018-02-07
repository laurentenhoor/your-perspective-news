import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './desktop-viewer.html';
import style from './desktop-viewer.styl';

class DesktopViewerCtrl {

	constructor($window, $scope, $location, $firstUseDialog) {
		'ngInject';

		var $ctrl = this;

		$ctrl.showMobile = false;
		$ctrl.absUrl = $location.absUrl();
		console.log('absUrl', $ctrl.absUrl)
		
		angular.element($window).bind('resize', () => {
			$scope.$apply(function() {
				checkWindowSize();	

			});
		});

		angular.element($window).bind("orientationchange", () => {
			
		})

		$ctrl.clickMoreInfo = () => {
			var result = document.getElementsByClassName("company-logo-container");
			var wrappedResult = angular.element(result);
			console.log(wrappedResult)

			console.log('clickMoreInfo')
			// $firstUseDialog.show();
		}

		
		
		function checkWindowSize() {
			
			var windowSize = $window.innerWidth;
			
			if (windowSize <= 736) {
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