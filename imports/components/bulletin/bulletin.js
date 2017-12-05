import angular from 'angular';
import angularMeteor from 'angular-meteor';

import moment from 'moment';
import 'moment/locale/nl'

import {name as yourpersArticleActions} from '../articleActions/articleActions';
import {name as SmoothScrollService} from '../../services/SmoothScrollService.js';
import {name as yourpersComments} from '../comments/comments';


import template from './bulletin.html';
import style from './bulletin.less';

import { Topics } from '/imports/api/topics.js';
import { Articles } from '/imports/api/articles.js';
import { Votes } from '/imports/api/votes.js';

class BulletinCtrl {

	constructor($rootScope, $scope, $reactive, $window, $location, $anchorScrol, SmoothScrollService) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$rootScope.stateIsLoading = true;
		
		$ctrl.loadedArticles = [];
		
		Meteor.subscribe('topicsAndArticles', {
			onReady: function(){
				
				$ctrl.helpers({

					'topics':function() {
						console.log('topics helper');
						
						return Topics.find({}, {}).fetch();
					},
					'userVoteMap':function() {
						console.log('userVoteMap helper for articles');
						
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
					$rootScope.initializedDatabase = true; // used in loader
				});
		
			}
			
		});
		
		
		moment.locale('nl');
		$ctrl.getTimeTag = function(article) {
			var date = article.publishedAt || article.createdAt;
			return moment(date).fromNow()
		}
		

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
		
	
		$ctrl.clickChat = function(topicId) {
			console.log('clickChat');
			SmoothScrollService.horizontalScroll('discuss-'+topicId, 'scroll-'+topicId);
			
		}
		
		
	}

}


export default angular.module('yourpers.bulletin', [
	angularMeteor,
	yourpersArticleActions,
	yourpersComments,
	SmoothScrollService,
	])
	.component('yourpersBulletin', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$window', '$location', '$anchorScroll', 'SmoothScrollService', BulletinCtrl]
	});
