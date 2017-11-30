import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './comments.html';
import style from './comments.less';

import { Comments } from '../../api/comments.js';


class CommentsCtrl {

	constructor($rootScope, $scope, $reactive) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		Meteor.subscribe('comments', {
			onReady: function(){
		
				$ctrl.helpers({
					
					'comments' : function() {
						var comments = Comments.find({parentItemId: $ctrl.getReactively('topicId')})
						console.log('fetch commments for topicId: '+ $ctrl.topicId); 
						
//						var roots = CommentsTreeBuilder.getCommentsTree(comments.fetch());
//						console.log(roots);
					
//						return roots;
					}

				});
		
			}
		});
				
		$ctrl.click = function() {
			console.log($ctrl.topicId);
		}
		
		
	}

}


export default angular.module('yourpers.comments', [
	angularMeteor,
	])
	.component('yourpersComments', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', CommentsCtrl],
		bindings: {
			topicId : '<',
		}
	});
