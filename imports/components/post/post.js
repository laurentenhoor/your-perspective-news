"use strict"

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularSanitize from 'angular-sanitize';

import template from './post.html';
import style from './post.less';

import { Posts } from '../../api/posts.js';
import { Meteor } from 'meteor/meteor';

class PostCtrl {
	
	constructor($rootScope, $scope, $reactive, $http) {

		$reactive(this).attach($scope);
//		$scope.viewModel(this);

		$rootScope.ip = 'anonymous';

		$http.get("http://freegeoip.net/json/").then(function(response) {
			console.log(response.data.ip);
			$rootScope.ip = response.data.ip;
		});
		
		this.helpers({
			posts() {
				return Posts.find({}, {sort: {createdAt: -1}, limit: 10}).fetch()//.reverse();
			},
			currentUser() {
				return Meteor.user();
			}
			
		});
		
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
			console.log('clear form')
		}
		
//		this.url = 'http://nos.nl/artikel/2176295-0-3-graden-warmer-door-klimaatbesluit-vs.html';
		
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
//				rawMetadata : this.rawMetadata,
				score: 0,
				owner: Meteor.userId(),
				email: Meteor.user() ? Meteor.user().emails[0].address : 'null',
						ip: $rootScope.ip
			}, function(error, _id){
				
				$scope.$ctrl.clearForm();
				$scope.$ctrl.url = '';
				
				// or try function(error, result) and still get nothing 
				// console.log('result: ' + result);
				console.log('error: ' + error);
				console.log('_id: ' + _id); //this._id doesn't work either

//				this.clearForm();
//				$scope.$apply();
				$rootScope.stateIsLoading = false;
				$rootScope.$apply();

			});

		}
		
		this.upVote = function(id) {
			console.log('upVote')
			Posts.update(id, {$inc : { score: 1}});
		}

		this.downVote = function(id) {
			Posts.update(id, {$inc : { score: -1}});
		}
		
		this.urlChange();
	}
}

export default angular.module('allpers.post', [
	angularMeteor, angularSanitize
	])
	.component('allpersPost', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$http', PostCtrl]
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