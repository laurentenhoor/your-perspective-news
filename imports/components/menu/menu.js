import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './menu.html';
import style from './menu.less';

import {name as yourpersAuthentication} from '/imports/components/authentication/authentication';

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
  yourpersArticleActions,
  yourpersAuthentication
])
  .component('yourpersMenu', {
    templateUrl : template,
    controller: ['$scope', '$location', '$window', MenuCtrl]
  });