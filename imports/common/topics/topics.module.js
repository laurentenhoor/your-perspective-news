import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngSocialShare from 'angular-socialshare';

import ArticleTiles from './article-tiles/article-tiles.module';
import ArticleActions from './article-actions/article-actions.module';
// import CategoryTiles from './category-tiles/category-tiles.module';

import SummaryTile from './summary-tile/summary-tile.module';
import TopicControls from './topic-controls/topic-controls.module';
import CommentsTile from './comments-tile/comments-tile.module';
import OpinionTile from './opinion-tile/opinion-tile.module';

import Vote from './vote/vote.module';
import TopicsComponent from './topics.component';
import AutoScrollService from './auto-scroll.service';
import TimeFilters from './time.filter'

export default angular.module('topics', [
	SummaryTile,
	ArticleTiles,
	ArticleActions,
	CommentsTile,
	OpinionTile,
	TopicControls,
	Vote,
	ngSocialShare,
	'ArticleActionsButton',
])
	.component('topics', TopicsComponent)
	.service('$autoScroll', AutoScrollService)
	.filter('timeFromNow', TimeFilters.timeFromNow)
	.filter('today', TimeFilters.today)
	.config(($stateProvider) => {
		'ngInject';

		$stateProvider
			.state('topics', {
				url: "/",
				component: 'topics',
			})
			.state('singleTopic', {
				url: "/topic/:singleTopicId",
				component: 'topics',
				resolve: {
					singleTopicId: ($transition$) => {
					  return $transition$.params().singleTopicId
				  }
				}
			});

	})
	.name;