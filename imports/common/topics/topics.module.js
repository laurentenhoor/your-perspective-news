import angular from 'angular';

import ngSocialShare from 'angular-socialshare';

import ArticleActions from './article-actions/article-actions.module';
import Vote from './vote/vote.module';
import HotnessIndicator from './hotness-indicator/hotness-indicator.module';

import Topic from './topic/topic.module';
import TopicsComponent from './topics.component';

import AutoScrollService from './auto-scroll.service';
import TimeFilters from './time.filter'

export default angular.module('topics', [
	ngSocialShare,

	ArticleActions,
	Vote,
	HotnessIndicator,
	
	Topic,
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