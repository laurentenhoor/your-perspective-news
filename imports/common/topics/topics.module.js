import angular from 'angular';
import angularMeteor from 'angular-meteor';

import TopicsComponent from './topics.component';
import AutoScrollService from './auto-scroll.service';

import ArticleMenu from '/imports/common/article-menu/article-menu';
import yourpersComments from '/imports/common/comments-tile/comments-tile';

export default angular.module('topics', [
	ArticleMenu,
	yourpersComments,
])
	.component('topics', TopicsComponent)
	.service('$autoScroll', AutoScrollService)
	.config(($stateProvider) => {
		'ngInject';

		$stateProvider
			.state('topics', {
				url: "/",
				component: 'topics'
			});

	})
	.name;