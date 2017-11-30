import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as CommentsTreeBuilder} from '../../services/CommentsTreeBuilder.js';

import template from './comments.html';
import style from './comments.less';
import commentsTreeTemplate from './commentsTree.html';

import { Comments } from '../../api/comments.js';


class CommentsCtrl {

	constructor($rootScope, $scope, $reactive, CommentsTreeBuilder) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.commentsTreeTemplate = commentsTreeTemplate;
		
		Meteor.subscribe('comments', {
			onReady: function(){
		
				$ctrl.helpers({
					
					'comments' : function() {
						var comments = Comments.find({parentItemId: $ctrl.getReactively('topicId')})
						console.log('fetch commments for topicId: '+ $ctrl.topicId); 
						
						var roots = CommentsTreeBuilder.getCommentsTree(comments.fetch());
						console.log(roots);
					
						return roots;
					}

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
				score: 0
				
			}, function(error, _id){
				
				console.log('error: ' + error);
				console.log('_id: ' + _id);
				
				comment.newChildComment = '';
				$scope.$apply();

			});
			
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