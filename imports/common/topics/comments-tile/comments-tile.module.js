import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularSanitize from 'angular-sanitize';

import CommentsTileComponent from './comments-tile.component';
import AutoFocusDirective from '/imports/directives/auto-focus.directive';
import CommentsTreeService from './comments-tree.service';


export default angular
	.module('CommentsTile', [
		angularMeteor,
		angularSanitize,
		AutoFocusDirective,
	])
	.component('commentsTile', CommentsTileComponent)
	.service('$commentsTree', CommentsTreeService)
	.name;