import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as yourpersArticleActions} from '../articleActions/articleActions';

import template from './bulletin.html';
import style from './bulletin.less';

import { Topics } from '../../api/topics.js';
import { Articles } from '../../api/articles.js';
import { Votes } from '../../api/votes.js';

class BulletinCtrl {

	constructor($rootScope, $scope, $reactive, $window) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$rootScope.stateIsLoading = true;
		
		$ctrl.loadedArticles = [];
		
		Meteor.subscribe('topicsAndArticles', {
			onReady: function(){
				
				$ctrl.helpers({

					'topics':function() {
						console.log('topics helper');
						
						return Topics.find({}).fetch();
					},
					'userVoteMap':function() {
						console.log('userVoteMap helper');
						
						var votes = Votes.find({
							articleId: { "$in": $ctrl.getReactively('loadedArticles') }
						}).fetch();
						
						var userVoteMap = {};
						angular.forEach(votes, function(vote, i) {
							userVoteMap[vote.articleId] = vote.value;
						});
						return userVoteMap;
					},
					'articlesScoreMap':function() {
						console.log('articlesScoreMap helper');
						
						var articles = Articles.find({
							_id: { "$in": $ctrl.getReactively('loadedArticles') }
						}).fetch();
						
						var articlesScoreMap = {};
						angular.forEach(articles, function(article, i) {
							articlesScoreMap[article._id] = article.score;
						});
						return articlesScoreMap;
					}
					
				});
				
				$scope.$apply(function() {
					$rootScope.stateIsLoading = false;
					$rootScope.initializedDatabase = true;
				});
		
			}
			
		});

		$ctrl.getArticlesByIds = function(ids) {
			var articles = Articles.find({"_id": { "$in": ids }});
			return articles.fetch();
		}
		
		$ctrl.getArticleWithHighestScore = function(articles) {
			var highestScore = null;
			var highestId = null;
			var highestArticle = null;
			
			angular.forEach(articles, function(article, i) {
				if (article.score > highestScore || !highestScore) {
					highestScore = article.score;
					highestArticle = article;
				}
			});
			return highestArticle;
		};

		$ctrl.vote = function(article, voteUpOrDown) {

			if (!Meteor.userId()) {
				$('#login-sign-in-link').click();
				return;
			}
			$ctrl.call('voteById', article._id, voteUpOrDown); 
			
		}

		$ctrl.clickArticle = function(topic, category, article) {
			topic.selectedArticle[category] = article;
		}
		
		
		
		$ctrl.clickChat = function() {
			console.log('clickChat');
		}
		
		
	}

}


export default angular.module('yourpers.bulletin', [
	angularMeteor,
	yourpersArticleActions,
	])
	.component('yourpersBulletin', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$window', BulletinCtrl]
	});
