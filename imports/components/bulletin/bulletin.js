import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as yourpersAddArticle} from '../addArticle/addArticle';

import template from './bulletin.html';
import style from './bulletin.less';

import { Topics } from '../../api/topics.js';

class BulletinCtrl {

	constructor($rootScope, $scope, $reactive, $window) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.helpers({

			topics() {
				return Topics.find({}).fetch();
			}
			
		});
		
		$ctrl.clickArticle = function(topic, category, article) {
			topic.selectedArticle[category] = article;
		}
		
		$ctrl.remove = function(topic, article) {
			
			console.log(article._id);
			console.log(topic._id);
			
			Meteor.call('removeArticle', topic._id, article._id)
			
			
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