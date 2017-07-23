//"use strict"

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './posts.html';

import angularSanitize from 'angular-sanitize';

import './posts.less';

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
		
//		this.url = 'http://nos.nl/artikel/2176295-0-3-graden-warmer-door-klimaatbesluit-vs.html';
		
		
		this.helpers({
			posts() {
				return Posts.find({}, {sort: {score: -1}, limit: 20}).fetch()//.reverse();
			},
			currentUser() {
				return Meteor.user();
			}
			
		});
		
		function isValid(url) {
			
		    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		    return urlregex.test(url);
		    
		}
		
		this.urlChange = function() {
			
			console.log($rootScope)
			
			this.postMetaDataAvailable = false;
			this.imageUrl = '';
			this.logoUrl = '';
			this.description = '';
			this.title = '';
			this.publisher = '';
			
			if (!isValid(this.url)) {
				return;
			}
			$rootScope.stateIsLoading = true;
			
			this.call('getMetaData', this.url, function(error, result) {
				
				$scope.$apply(function() {
					$rootScope.stateIsLoading = false;
				});
				
				if(error) {
					return;
				}
				
				this.imageUrl = result['og:image'] || result['twitter:image'] || result['twitter:image:src'];
				this.logoUrl = result.logos.clearbit || result.logos.icon;
				this.description = (result['twitter:description'] || result['og:description'] || result['Description'])//.replace(/<\/?[^>]+(>|$)/g, "");
				this.title = (result['gwa_contentTitle'] || result['twitter:title'] || result['og:title'] || result['Title'])//.replace(/<\/?[^>]+(>|$)/g, "");
				this.publisher = result['og:site_name'] || result['application-name'];
				this.postMetaDataAvailable = true;
				
				$rootScope.stateIsLoading = false;
				
			});
			
		
		}
		
		this.urlChange();

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
			ip: ''
		});

		// Clear form
		this.newTitle = '';
		this.newUrl = '';
		this.newSubstantiation = '';
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