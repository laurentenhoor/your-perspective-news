import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './posts.html';

import ngSidebarJs from 'angular-sidebarjs';

import './sidebarjs-custom.css';// original file in: node_modules/sidebarjs/dist/sidebarjs.css;
import './posts.less';

import { Posts } from '../../api/posts.js';
import { Meteor } from 'meteor/meteor';

class PostCtrl {

	constructor($scope, $http) {

		$scope.viewModel(this);

		this.ip = 'anonymous';

		$http.get("http://freegeoip.net/json/").then(function(response) {
			console.log(response.data.ip);
			this.ip = response.data.ip;
		});

		this.helpers({
			posts() {
				return Posts.find({}, {sort: {score: -1}, limit: 20}).fetch()//.reverse();
			}
		})
		
	}
	
	upVote(id) {
		Posts.update(id, {$inc : { score: 1}});
	}
	downVote(id) {
		Posts.update(id, {$inc : { score: -1}});
	}

	post() {
		
		Posts.insert({
			title: this.newTitle,
			url : this.newUrl,
			score: 0,
			owner: Meteor.userId(),
		    username: Meteor.user().username
		});

		// Clear form
		this.newTitle = '';
		this.newUrl = '';
	}

}

export default angular.module('allpers.post', [
	angularMeteor, ngSidebarJs
	])
	.component('allpersPost', {
		templateUrl : template,
		controller: ['$scope', '$http', PostCtrl]
	});