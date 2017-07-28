"use strict"

import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './item.html';
import style from '../post/post.less';

import { Posts } from '../../api/posts.js';
import { Meteor } from 'meteor/meteor';

class ItemCtrl {

	constructor($rootScope, $scope, $reactive, $http, $routeParams) {

		$reactive(this).attach($scope);
	
		console.log($routeParams.id);	
	
		this.helpers({
			post() {
				var post =Posts.findOne({_id: $routeParams.id});
				console.log(post);
				return post;
			}


		});

	}
}

export default angular.module('allpers.item', [
	angularMeteor
	])
	.component('allpersItem', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$http', '$routeParams', ItemCtrl]
	});
