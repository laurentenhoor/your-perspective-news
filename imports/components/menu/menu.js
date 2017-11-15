import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './menu.html';
import style from './menu.less';

import {name as yourpersAddArticle} from '../addArticle/addArticle';

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
  yourpersAddArticle
])
  .component('yourpersMenu', {
    templateUrl : template,
    controller: ['$scope', '$location', '$window', MenuCtrl]
  });