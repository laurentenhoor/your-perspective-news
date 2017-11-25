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
		
		$ctrl.loadedArticles = [];
		$ctrl.userVoteMap = {};
		$ctrl.articlesScoreMap = {};
		
		Meteor.subscribe('topicsAndArticles', {
			onReady: function(){
				
				$ctrl.helpers({

					'topics':function() {
						console.log('topics helper');
						console.log($ctrl.loadedArticles)
						return Topics.find({}).fetch();
					},
					'votes':function() {
						console.log('vote helper');
						var votes = Votes.find({
							articleId: { "$in": $ctrl.getReactively('loadedArticles') }
						}).fetch();
						
						angular.forEach(votes, function(vote, i) {
							$ctrl.userVoteMap[vote.articleId] = vote.value;
						});
					},
					'articles':function() {
						console.log('articles helper');
						var articles = Articles.find({
							_id: { "$in": $ctrl.getReactively('loadedArticles') }
						}).fetch();
						
						angular.forEach(articles, function(article, i) {
							$ctrl.articlesScoreMap[article._id] = article.score;
						});
					}
					
				});
				
			}
			
		});

		$ctrl.getArticlesByIds = function(ids) {
			var articles = Articles.find({"_id": { "$in": ids }});
			return articles.fetch();
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