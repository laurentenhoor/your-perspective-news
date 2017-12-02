import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as CommentsTreeBuilder} from '../../services/CommentsTreeBuilder.js';

import template from './comments.html';
import style from './comments.less';
import commentsTreeTemplate from './commentsTree.html';

import { Comments } from '/imports/api/comments.js';
import { Votes } from '/imports/api/votes.js';


class CommentsCtrl {

	constructor($rootScope, $scope, $reactive, CommentsTreeBuilder) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.commentsTreeTemplate = commentsTreeTemplate;
		
		$ctrl.loadedComments = [];
		
		Meteor.subscribe('comments', {
			onReady: function(){
		
				$ctrl.helpers({
					
					
					'comments' : function() {
						console.log('fetch comments for topicId: '+ $ctrl.topicId);
						
						var comments = Comments.find({parentItemId: $ctrl.getReactively('topicId')})
						var roots = CommentsTreeBuilder.getCommentsTree(comments.fetch());
					
						return roots;
					},
	
					
					'userCommentsMap' : function() {
						console.log('userComments helper for comments');
						
						var commentIds = Comments.find({parentItemId: $ctrl.getReactively('topicId')})
						.map(function (comment) { return comment._id; });
						
						var commentsByUser = Comments.find({
							ownerId: Meteor.userId(),
							_id: { "$in": commentIds }
						}).fetch();
						
						var userCommentsMap = {};
						angular.forEach(commentsByUser, function(comment, i) {
							userCommentsMap[comment._id] = true;
						});
						
						return userCommentsMap;
					},
					
					
					'userVoteMap' : function() {
						console.log('userVoteMap helper for comments');
						
						var commentIds = Comments.find({parentItemId: $ctrl.getReactively('topicId')})
						.map(function (comment) { return comment._id; });
						
						var votes = Votes.find({
							articleId: { "$in": commentIds}
						}).fetch();
						
						var userVoteMap = {};
						angular.forEach(votes, function(vote, i) {
							userVoteMap[vote.articleId] = vote.value;
						});
						
						return userVoteMap;
					},

		
					
				});
		
			}
		});
	
		
		$ctrl.newComment = function(comment) {
			
			console.log(comment.newChildComment);
			console.log(comment._id);

			Comments.insert({
				
				parentItemId : $ctrl.topicId,
				parentCommentId : comment._id,
				ownerId : Meteor.userId(),
				ownerName : Meteor.user() ? Meteor.user().username : null,
				comment : comment.newChildComment,
				score: 0,
				
			}, function(error, _id){
				
				console.log('error: ' + error);
				console.log('_id: ' + _id);
				
				comment.newChildComment = '';
				$scope.$apply();

			});
			
		}
		
		$ctrl.vote = function(commentId, voteUpOrDown) {

			if (!Meteor.userId()) {
				$('#login-sign-in-link').click();
				return;
			}
			$ctrl.call('voteById', commentId, voteUpOrDown); 
			
		}

		
		$ctrl.deleteComment = function(comment) {
			Comments.remove({
				_id : comment._id
			});
		}
				
		$ctrl.print = function(something) {
			console.log(something);
		}
		
	}

}


export default angular.module('yourpers.comments', [
	angularMeteor,
	CommentsTreeBuilder,
	])
	.component('yourpersComments', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', 'CommentsTreeBuilder', CommentsCtrl],
		bindings: {
			topicId : '<',
		}
	});