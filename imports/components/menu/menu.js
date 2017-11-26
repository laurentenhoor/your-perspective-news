import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './menu.html';
import style from './menu.less';

import {name as yourpersArticleActions} from '../articleActions/articleActions';

class MenuCtrl {
	
  constructor($scope, $location, $window) {
	  
	  $scope.isActive = function(viewLocation) {
	    return viewLocation === $location.path();
	  };	
	  
	  $scope.window = $window;
	  
  }
  
}
 
export default angular.module('menu', [
  angularMeteor,
  yourpersArticleActions
])
  .component('yourpersMenu', {
    templateUrl : template,
    controller: ['$scope', '$location', '$window', MenuCtrl]
  });