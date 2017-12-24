import angular from 'angular';
import angularMeteor from 'angular-meteor';

import moment from 'moment';
import 'moment/locale/nl'

import yourpersArticleActions from '/imports/common/article-menu/article-menu';
import {name as SmoothScrollService} from '/imports/services/SmoothScrollService';
import yourpersComments from '/imports/common/comments-tile/comments-tile';

import {name as AuthService} from '/imports/services/AuthService'

import template from './news-tiles.html';
import style from './news-tiles.less';

import { Topics } from '/imports/api/topics.js';
import { Articles } from '/imports/api/articles.js';
import { Votes } from '/imports/api/votes.js';

class BulletinCtrl {

	constructor($rootScope, $scope, $reactive, $window, $location, SmoothScrollService, AuthService, $loader, $timeout) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.loadedArticles = [];
		
		Meteor.subscribe('topicsAndArticles', {
			onReady: function(){

				$loader.databaseInitialized();
				
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
		
			}
			
		});

		$ctrl.openExternalUrl = function(url) {
			if (url && url != '') {

				$loader.start();
				
				$timeout(() => {
					window.location.href = url;
				},200)
				
			}
		}
		
		moment.locale('nl');
		$ctrl.getTimeTag = function(article) {
			
			if (!article) {
				return;
			}
			var date;
			if (article.publishedAt) {
				date = article.publishedAt; 
			} else {
				date = article.updatedAt; 
			}
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
			
			if (AuthService.isLoggedIn()) {
				$ctrl.call('voteById', article._id, voteUpOrDown);
			} 
			
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

export default angular.module('bulletin', [
	angularMeteor,
	yourpersArticleActions,
	yourpersComments,
	SmoothScrollService,
	AuthService
	])
	.component('yourpersBulletin', {
		controller: BulletinCtrl,
		templateUrl : template
	}).name;
