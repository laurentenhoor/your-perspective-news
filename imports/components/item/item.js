"use strict"

import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './item.html';
import style from '../post/post.less';
import style2 from './item.less';

import { Posts } from '../../api/posts.js';
import { Comments } from '../../api/comments.js';
import { Meteor } from 'meteor/meteor';

class ItemCtrl {

	constructor($rootScope, $scope, $reactive, $http, $routeParams, $window) {

		$reactive(this).attach($scope);
	
		console.log($routeParams.id);	
		
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
		            parent.children = children[parent._id];
		            for (var i = 0, len = parent.children.length; i < len; ++i) {
		                findChildren(parent.children[i]);
		            }
		        }
		    };

		    // enumerate through to handle the case where there are multiple roots
		    for (var i = 0, len = roots.length; i < len; ++i) {
		        findChildren(roots[i]);
		    }

		    return roots;
		}

	
		this.helpers({
			post() {
				var post =Posts.findOne({_id: $routeParams.id});
				console.log(post);
				return post;
			},
			comments() {
				var comments = Comments.find({parentItemId: $routeParams.id})
				console.log(comments.fetch());
				
				var roots = buildHierarchy(comments.fetch());
				console.log(roots);
				
				return roots;
			}

		});
		
		this.newComment = function(comment) {
			
			console.log(comment.newChildComment);
			console.log(comment._id);

			Comments.insert({
				parentItemId : $routeParams.id,
				parentCommentId : comment._id,
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
