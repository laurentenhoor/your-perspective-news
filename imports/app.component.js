import angular from 'angular';
import angularMeteor from 'angular-meteor';

import AppView from './app.html';
import AppStyle from './app.less';

class AppCtrl {
	
	constructor($scope, $reactive, $window, $document) {
		'ngInject';
		
		console.log('init AppCtrl');
		
		let $ctrl = this;
		$reactive($ctrl).attach($scope);
		
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

export const appComponent = {
	controller: AppCtrl,
	templateUrl : AppView
  };