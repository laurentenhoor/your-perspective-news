import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './header-menu.html';
import style from './header-menu.styl';

import yourpersArticleActions from '../article-menu/article-menu';

class MenuCtrl {
	
  constructor($scope, $rootScope, $location, $window) {
    'ngInject'
	  
	  $scope.isActive = function(viewLocation) {
	    return viewLocation === $location.path();
	  };	
	  
	  $scope.window = $window;
	  
  }
  
}
 
export default angular.module('menu', [
  angularMeteor,
  yourpersArticleActions,
  'auth',
])
  .component('yourpersMenu', {
    templateUrl : template,
    controller: MenuCtrl,
  }).name;