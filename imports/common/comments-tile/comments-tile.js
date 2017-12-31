import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularSanitize from 'angular-sanitize';

import moment from 'moment';
import 'moment/locale/nl'

import template from './comments-tile.html';
import style from './comments-tile.styl';
import commentsTreeTemplate from './comments-tree.html';

import { Comments } from '/imports/api/comments.js';
import { Votes } from '/imports/api/votes.js';

import AutoFocusDirective from '/imports/directives/auto-focus.directive';
import CommentsTreeService from './comments-tree.service';

class CommentsCtrl {

	constructor($rootScope, $scope, $document, $reactive, $commentsTree, $auth, $vote) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.commentsTreeTemplate = commentsTreeTemplate;

		$ctrl.loadedComments = [];

		Meteor.subscribe('comments', {
			onReady: function(){

				$ctrl.helpers({

					'comments' : function() {
//						console.log('fetch comments for topicId: '+ $ctrl.topicId);

						var comments = Comments.find({parentItemId: $ctrl.getReactively('topicId')})
						var roots = $commentsTree.getCommentsTree(comments.fetch());

						return roots;
					},


					'userCommentsMap' : function() {
//						console.log('userComments helper for comments');

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
//						console.log('userVoteMap helper for comments');

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
		
		$ctrl.willShowCommentField = function(initialValue) {
			
			if (initialValue == false) {
				
				if($auth.isLoggedIn()) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
			
		}


		moment.locale('nl');
		$ctrl.getTimeTag = function(comment) {
			var date = comment.updatedAt;
			return moment(date).fromNow()
		}

		$ctrl.newComment = function(comment) {

			console.log(comment.newChildComment);
			console.log(comment._id);
			 
			if($ctrl.processingComment) {
				console.error('Trying to save a comment, however still processing another...');
				return;
			}
			$ctrl.processingComment=true;

			Comments.insert({

				parentItemId : $ctrl.topicId,
				parentCommentId : comment._id,
				ownerId : Meteor.userId(),
				ownerName : Meteor.user() ? Meteor.user().profile.firstName : null,
						comment : comment.newChildComment,
						score: 0,

			}, function(error, _id){
				
				console.log('error: ' + error);
				console.log('_id: ' + _id);

				$ctrl.processingComment=false;
				
				comment.newChildComment = '';
				$scope.$apply();

			});

		}

		$ctrl.vote = function(commentId, voteUpOrDown) {
			$vote.voteById(commentId, voteUpOrDown);
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
	angularSanitize,
	AutoFocusDirective,
	])
	.component('yourpersComments', {
		templateUrl : template,
		controller: CommentsCtrl,
		bindings: {
			topicId : '<',
		}
	})
	.service('$commentsTree', CommentsTreeService)
	.name;