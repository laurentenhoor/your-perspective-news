import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './menu.html';

class MenuCtrl {
	
  constructor($scope, $location, $window) {
	  
	  $scope.isActive = function(viewLocation) {
	    return viewLocation === $location.path();
	  };	
	  
	  $scope.window = $window;
	  
  }
  
}
 
export default angular.module('menu', [
  angularMeteor
])
  .component('allpersMenu', {
    templateUrl : template,
    controller: ['$scope', '$location', '$window', MenuCtrl]
  });