import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as yourpersAddArticle} from '../addArticle/addArticle';

import template from './bulletin.html';
import style from './bulletin.less';

import { Topics } from '../../api/topics.js';
import { Articles } from '../../api/articles.js';
import { Votes } from '../../api/votes.js';

class BulletinCtrl {

	constructor($rootScope, $scope, $reactive, $window) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

//		$ctrl.call('getTopics', function(error, result) {
//			$ctrl.topics = result;
//			console.log(result);
//		});
		
		$ctrl.helpers({

			topics() {
				return Topics.find({}).fetch();
			},
			
//			getArticleById(id) {
//				console.log('getArticle by id: ' + id)
//				return Articles.find({_id:id}).fetch();
//			}
			
		});
		
		$ctrl.getArticleById = function(id) {

			console.log('getArticle by id: ' + id)
			var article = Articles.findOne({_id : id});
			console.log(article)
			return article;
			
		}
		
		$ctrl.vote = function(article, voteUpOrDown) {
			
			console.log(article);
			console.log(article._id);
			console.log(voteUpOrDown);

			if (!Meteor.userId()) {
				$('#login-sign-in-link').click();
				return;
			}
			$ctrl.call('voteById', article._id, voteUpOrDown); 
			
		}
		
		$ctrl.getUserVoteByArticleId = function(articleId) {
			
			if (vote = Votes.findOne({articleId : articleId})) {
				
				console.log(vote);
				return vote.value;
				
			}
			console.log(0);
			return 0;
		}
		
		
		
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