import angular from 'angular';
import angularMeteor from 'angular-meteor';

import moment from 'moment';
import 'moment/locale/nl'

import {name as CommentsTreeBuilder} from '../../services/CommentsTreeBuilder.js';

import template from './comments.html';
import style from './comments.less';
import commentsTreeTemplate from './commentsTree.html';

import {name as AuthService} from '/imports/services/AuthService';

import { Comments } from '/imports/api/comments.js';
import { Votes } from '/imports/api/votes.js';

import {name as AutoFocusDirective} from '/imports/directives/autoFocus.js';


class CommentsCtrl {

	constructor($rootScope, $scope, $document, $reactive, CommentsTreeBuilder, AuthService) {

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
						var roots = CommentsTreeBuilder.getCommentsTree(comments.fetch());

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
				
				if(AuthService.isLoggedIn()) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
			
		}

		$ctrl.blurAllInputs = function() {

			var inputs = $document[0].querySelectorAll('input');

			console.log(inputs);

			inputs.forEach(function(input) {
				console.log(input.name + ': ' + input.value);
				console.log(input);
				input.blur();

			});
		}

		moment.locale('nl');
		$ctrl.getTimeTag = function(comment) {
			var date = comment.updatedAt;
			return moment(date).fromNow()
		}

		$ctrl.newComment = function(comment) {
			
			$ctrl.sendButtonsDisabled = true;

			console.log(comment.newChildComment);
			console.log(comment._id);

			Comments.insert({

				parentItemId : $ctrl.topicId,
				parentCommentId : comment._id,
				ownerId : Meteor.userId(),
				ownerName : Meteor.user() ? Meteor.user().profile.firstName : null,
						comment : comment.newChildComment,
						score: 0,

			}, function(error, _id){

				$ctrl.sendButtonsDisabled = false;
				
				console.log('error: ' + error);
				console.log('_id: ' + _id);

				comment.newChildComment = '';
				$scope.$apply();

			});

			$ctrl.blurAllInputs();

		}

		$ctrl.vote = function(commentId, voteUpOrDown) {

			if (AuthService.isLoggedIn()) {
				$ctrl.call('voteById', commentId, voteUpOrDown); 
			}
			
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
	AutoFocusDirective,
	AuthService,
	])
	.component('yourpersComments', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$document', '$reactive', 'CommentsTreeBuilder', 'AuthService', CommentsCtrl],
		bindings: {
			topicId : '<',
		}
	});