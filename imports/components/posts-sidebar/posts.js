"use strict"

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './posts.html';

import ngSidebarJs from 'angular-sidebarjs';

import './sidebarjs-custom.css';// original file in: node_modules/sidebarjs/dist/sidebarjs.css;
import './posts.less';

import { Posts } from '../../api/posts.js';
import { Meteor } from 'meteor/meteor';

class PostCtrl {

	constructor($rootScope, $scope, $http) {

		$scope.viewModel(this);

		$rootScope.ip = 'anonymous';

		$http.get("http://freegeoip.net/json/").then(function(response) {
			console.log(response.data.ip);
			$rootScope.ip = response.data.ip;
		});

		this.helpers({
			posts() {
				return Posts.find({}, {sort: {score: -1}, limit: 20}).fetch()//.reverse();
			},
			currentUser() {
				return Meteor.user();
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
			substantiation: this.newSubstantiation,
			score: 0,
			owner: Meteor.userId(),
			email: Meteor.user() ? Meteor.user().emails[0].address : 'null',
			ip: $rootScope.ip
		});

		// Clear form
		this.newTitle = '';
		this.newUrl = '';
		this.newSubstantiation = '';
	}

}

export default angular.module('allpers.post.sidebar', [
	angularMeteor, ngSidebarJs
	])
	.component('allpersPostSidebar', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$http', PostCtrl]
	})
	.directive('httpPrefix', function() {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function(scope, element, attrs, controller) {
	            function ensureHttpPrefix(value) {
	                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
	                if(value && !/^(https?):\/\//i.test(value)
	                   && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0 ) {
	                    controller.$setViewValue('http://' + value);
	                    controller.$render();
	                    return 'http://' + value;
	                }
	                else
	                    return value;
	            }
	            controller.$formatters.push(ensureHttpPrefix);
	            controller.$parsers.splice(0, 0, ensureHttpPrefix);
	        }
	    };
	});