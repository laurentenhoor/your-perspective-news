"use strict"

import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './item.html';
import style from '../post/post.less';
import style2 from './item.less';

import { Posts } from '../../api/posts.js';
import { Votes } from '../../api/votes.js';
import { Comments } from '../../api/comments.js';
import { Meteor } from 'meteor/meteor';

class ItemCtrl {

	constructor($rootScope, $scope, $reactive, $http, $routeParams, $window) {

		$reactive(this).attach($scope);
		
		$rootScope.activeItem = $routeParams.id;
	
		Meteor.subscribe('votes', function() {
			$scope.dataAvailable = true;
			$scope.$apply();
		});
		
		Meteor.subscribe('posts', function() {
			post = Posts.findOne({_id: $routeParams.id});
			console.log(post)
			$scope.header = 'Jouwpers -  '+post.title;
		});
		
//		console.log($routeParams.id);	
		
		function buildHierarchy(arry) {

		    var roots = [], children = {};

		    // find the top level nodes and hash the children based on parent
		    for (var i = 0, len = arry.length; i < len; ++i) {
		        var item = arry[i],
		            p = item.parentCommentId,
		            target = !p ? roots : (children[p] || (children[p] = []));

		        target.push(item);
		    }

		    // function to recursively build the tree
		    var findChildren = function(parent) {
		        if (children[parent._id]) {
		        		// add children to parent and sort by voting score
		            parent.children = children[parent._id].sort(function(a, b){
		            		return (b.score - a.score);
		            });
		            for (var i = 0, len = parent.children.length; i < len; ++i) {
		                findChildren(parent.children[i]);
		            }
		        }
		    };

		    // enumerate through to handle the case where there are multiple roots
		    for (var i = 0, len = roots.length; i < len; ++i) {
		        findChildren(roots[i]);
		    }

		    // sort root by voting score
		    roots.sort(function(a,b) {
		    		return b.score - a.score;
		    })
		    
		    return roots;
		}

	
		this.helpers({
			post() {
				return Posts.findOne({_id: $routeParams.id});
			},
			comments() {
				var comments = Comments.find({parentItemId: $routeParams.id})
				
				var roots = buildHierarchy(comments.fetch());
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
		
		this.voteValue = function(id) {

			if (vote = Votes.findOne({articleId : id}))
				return vote.value;
			return 0;
			
		}
		
		$window.scrollTo(0, 0);

	}
}

export default angular.module('yourpers.item', [
	angularMeteor
	])
	.component('yourpersItem', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$http', '$routeParams', '$window', ItemCtrl]
	});
