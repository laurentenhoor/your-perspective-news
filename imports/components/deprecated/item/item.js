import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularSanitize from 'angular-sanitize';

import template from './item.html';
import style from './item.less';

import { Meteor } from 'meteor/meteor';

import { Posts } from '/imports/api/posts.js';
import { Votes } from '/imports/api/votes.js';
import { Comments } from '/imports/api/comments.js';

import {name as CommentsTreeBuilder} from './services/CommentsTreeBuilder.js';


class ItemCtrl {

	constructor($rootScope, $scope, $reactive, $http, $routeParams, $window, CommentsTreeBuilder) {

		$reactive(this).attach($scope);
		
		$rootScope.activeItem = $routeParams.id;
	
		Meteor.subscribe('votes', function() {
			$scope.dataAvailable = true;
			$scope.$apply();
		});
		
		Meteor.subscribe('posts', function() {
			post = Posts.findOne({_id: $routeParams.id});
			console.log(post)
		});
		
//		console.log($routeParams.id);	

	
		this.helpers({
			post() {
				return Posts.findOne({_id: $routeParams.id});
			},
			comments() {
				var comments = Comments.find({parentItemId: $routeParams.id})
				
				var roots = CommentsTreeBuilder.getCommentsTree(comments.fetch());
//				console.log(roots);
			
				return roots;
			}

		});
		
		this.newComment = function(comment) {
			
			console.log(comment.newChildComment);
			console.log(comment._id);

			Comments.insert({
				parentItemId : $routeParams.id,
				parentCommentId : comment._id,
				ownerId : Meteor.userId(),
				ownerName : Meteor.user() ? Meteor.user().username : null,
				comment : comment.newChildComment,
				score: 0
				
			}, function(error, _id){
				
				console.log('error: ' + error);
				console.log('_id: ' + _id);
				
				comment.newChildComment = '';
				$scope.$apply();

			});
		}
		
		this.vote = function(id, voteValue) {
			
			if (!Meteor.userId()) {
				$('#login-sign-in-link').click();
				return;
			}
			this.call('voteById', id, voteValue); 
			
		}
		
		this.getVoteValue = function(id) {

			if (vote = Votes.findOne({articleId : id}))
				return vote.value;
			return 0;
			
		}
		
		$window.scrollTo(0, 0);

	}
}

export default angular.module('yourpers.item', [
	angularMeteor, 
	angularSanitize, 
	CommentsTreeBuilder
	])
	.component('yourpersItem', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$http', '$routeParams', '$window', 'CommentsTreeBuilder', ItemCtrl]
	});
