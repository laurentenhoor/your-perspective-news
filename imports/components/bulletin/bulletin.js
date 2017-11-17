import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as yourpersAddArticle} from '../addArticle/addArticle';

import template from './bulletin.html';
import style from './bulletin.less';

import { NewsItems } from '../../api/newsItems.js';

class BulletinCtrl {
	
	constructor($rootScope, $scope, $reactive, $window) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);	
		
		$ctrl.call('getNewsItems', function(error, newsItems) {
			
			$ctrl.newsItems = newsItems;
			
			angular.forEach($ctrl.newsItems, function(articleBlock, i){
				$ctrl.clickArticle(articleBlock.category, articleBlock.articles[0])
			}); 
			
		});
		
		$ctrl.selectedArticle = {};
		
		$ctrl.clickArticle = function(category, article) {
			$ctrl.selectedArticle[category] = article;
		}
		
	}

}


export default angular.module('yourpers.bulletin', [
	angularMeteor,
	yourpersAddArticle
	])
	.component('yourpersBulletin', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$window', BulletinCtrl]
	});