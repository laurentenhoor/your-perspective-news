import angular from 'angular';
import angularMeteor from 'angular-meteor';

import NewsTilesComponent from './news-tiles.component';
import AutoScrollService from './auto-scroll.service';

import ArticleMenu from '/imports/common/article-menu/article-menu';
import yourpersComments from '/imports/common/comments-tile/comments-tile';

export default angular.module('newsTiles', [
	ArticleMenu,
	yourpersComments,
])
	.component('newsTiles', NewsTilesComponent)
	.service('$autoScroll', AutoScrollService)
	.config(($stateProvider) => {
		'ngInject';

		$stateProvider
			.state('nieuws', {
				url: "/nieuws",
				component: 'newsTiles'
			});

	})
	.name;
