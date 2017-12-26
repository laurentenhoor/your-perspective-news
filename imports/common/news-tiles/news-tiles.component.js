
import template from './news-tiles.html';
import style from './news-tiles.less';

import moment from 'moment';
import 'moment/locale/nl'

import { Topics } from '/imports/api/topics.js';
import { Articles } from '/imports/api/articles.js';
import { Votes } from '/imports/api/votes.js';

class NewsTilesComponent {

	constructor($rootScope, $scope, $reactive, $window, $location, $autoScroll, $auth, $loader, $timeout) {
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

		$ctrl.openExternalUrl = function(article) {
			
			$ctrl.visitedId = article._id; // trigger animation of click
			$timeout(() => $ctrl.visitedId = null, 700); // should be > animation time

			if (article.url && article.url != '') {
				$timeout(() => window.location.href = article.url, 300);
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
			
			if ($auth.isLoggedIn()) {
				$ctrl.call('voteById', article._id, voteUpOrDown);
			} 
			
		}

		$ctrl.clickArticle = function(topic, category, article) {
			topic.selectedArticle[category] = article;
		}
		
	
		$ctrl.clickChat = function(topicId) {
			console.log('clickChat');
			$autoScroll.horizontalScroll('discuss-'+topicId, 'scroll-'+topicId);
			
		}
		
		
	}

}

export default {
    controller: NewsTilesComponent,
    templateUrl : template
}