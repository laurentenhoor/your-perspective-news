"use strict"

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularSanitize from 'angular-sanitize';

import moment from 'moment';
import 'moment/locale/nl'

import { Meteor } from 'meteor/meteor';
import { Votes } from '../../api/votes.js';
import { Posts } from '../../api/posts.js';
import { Comments } from '../../api/comments.js';

import template from './post.html';
import style from './post.less';


class PostCtrl {
	
	constructor($rootScope, $scope, $reactive, $http, $location, $anchorScroll) {

		$reactive(this).attach($scope);
//		$scope.viewModel(this);
		
		console.log(moment())
		
		
		
		Meteor.subscribe('votes', function() {
			$scope.dataAvailable = true;
			$scope.$apply();
		});

		$rootScope.ip = 'anonymous';

		$http.get("http://freegeoip.net/json/").then(function(response) {
			console.log(response.data.ip);
			$rootScope.ip = response.data.ip;
		});
		
		this.helpers({
			posts() {
				
//				var d = new Date();
//				d.setDate(d.getDate() - 3);
//				var newestPosts = Posts.find({createdAt: {$gt: d.getTime()}}, {sort: {score: -1}}).fetch()//.reverse();
//				var otherPosts = Posts.find({createdAt: {$lt: d.getTime()}},  {sort: {score: -1}}).fetch()//.reverse();
//				return newestPosts.concat(otherPosts)
				
				return Posts.find({}, {sort: {createdAt: -1}, limit: 30}).fetch()//.reverse();
			},
			currentUser() {
				return Meteor.user();
			}
			
		});
		
		
		this.getTimeTag = function(date) {
			console.log(date)
			moment.locale('nl');
			return moment(date).fromNow()
		}
		
		this.voteValue = function(id) {
			
			if (vote = Votes.findOne({articleId : id})) {
				return vote.value;
				
			}
			return 0;
			
		}
		
		function isValid(url) {
			
		    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		    return urlregex.test(url);
		    
		}
		
		function clearForm() {
			this.clearForm();
		}
		
		
		this.clearForm = function() {
			this.postMetaDataAvailable = false;
			this.imageUrl = '';
			this.logoUrl = '';
			this.description = '';
			this.title = '';
			this.publisher = '';	
			this.userMessage = '';
		}
		
		
		this.urlChange = function() {
			
			this.clearForm();
			
			if (!isValid(this.url)) {
				return;
			}
			$rootScope.stateIsLoading = true;
			
			this.call('getUrlMetadata', this.url, function(error, result) {
				
				$scope.$apply(function() {
					$rootScope.stateIsLoading = false;
				});
				
				if(error) {
					return;
				}
				
				console.log(result);
				
				this.imageUrl = result['og:image'] || result['twitter:image'] || result['twitter:image:src'];
				this.logoUrl = result.logos.clearbit || result.logos.icon;
				this.description = (result['twitter:description'] || result['og:description'] || result['Description'] || result['description'])//.replace(/<\/?[^>]+(>|$)/g, "");
				this.title = (result['gwa_contentTitle'] || result['twitter:title'] || result['og:title'] || result['Title'])//.replace(/<\/?[^>]+(>|$)/g, "");
				this.publisher = result['og:site_name'] || result['application-name'];
				this.postMetaDataAvailable = true;
				this.rawMetadata = result;
				
				$rootScope.stateIsLoading = false;
				
			});
			
		
		}
		
		this.post = function() {
			
			$rootScope.stateIsLoading = true;
			
			Posts.insert({
				title: this.title,
				url : this.url,
				imageUrl : this.imageUrl,
				userMessage: this.userMessage,
				description : this.description,
				publisher : this.publisher,
				logoUrl : this.logoUrl,
				rawMetadata : JSON.stringify(this.rawMetadata),
				score: 0,
				ownerId: Meteor.userId(),
				ownerName: Meteor.user().username,
//				email: Meteor.user() ? Meteor.user().emails[0].address : 'null',
				ip: $rootScope.ip
			}, function(error, _id){
				
				console.log('error: ' + error);
				console.log('_id: ' + _id);

				$rootScope.$apply(function() {
					$rootScope.stateIsLoading = false;
					$location.hash(_id)
					$anchorScroll();
				});
				
				$scope.$ctrl.clearForm();
				$scope.$ctrl.url = '';

			});

		}
		
		this.vote = function(id, voteValue) {
		
			if (!Meteor.userId()) {
				$('#login-sign-in-link').click();
				return;
			}
			this.call('voteById', id, voteValue); 
			
		}
		
		this.commentCount = function(articleId) {
			
			return Comments.find({parentItemId : articleId}).count();
			
		}

		this.article = function() {
			alert("Hier kun je straks bronnen toevoegen en reageren.");
		}
		
		this.urlChange();
		

	    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
	        if($location.hash()) $anchorScroll();  
	      });
		
		
		
//		$rootScope.stateIsLoading = true;
//		this.url = 'http://www.elsevierweekblad.nl/nederland/achtergrond/2017/07/twee-jongens-doodsteken-nick-bood-16-525841/';
		
	}
}

export default angular.module('yourpers.post', [
	angularMeteor, angularSanitize
	])
	.component('yourpersPost', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$http', '$location', '$anchorScroll', PostCtrl]
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
	}).directive('selectOnClick', ['$window', function ($window) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            element.on('click', function () {
	                if (!$window.getSelection().toString()) {
	                    // Required for mobile Safari
	                    this.setSelectionRange(0, this.value.length)
	                }
	            });
	        }
	    };
	}]);;