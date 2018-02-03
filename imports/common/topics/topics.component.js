import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Random } from 'meteor/random'

class TopicsComponent {

	constructor($scope, $reactive, $loader, $state, $articlesApi, $topicsApi, $timeout, $autoScroll) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.topicsOffset = 0;
		$ctrl.amountOfTopics = 5;
		$ctrl.firstInit = true;

		$ctrl.$onChanges = (changes) => {
			if (changes.singleTopicId) {
				$ctrl.singleTopicId = angular.copy($ctrl.singleTopicId);
				if ($state.current.name == 'singleTopic') {
					ga('send', {
						hitType: 'event',
						eventCategory: 'Share',
						eventAction: 'Conversion',
						eventLabel: '/topic/' + $ctrl.singleTopicId
					})
				}
			}
		}

		$topicsApi.setCallbacks({
			createdTopic: (topicId) => {
				console.log('createdCallback', topicId)
				subscribeToArticles();
			},
			removedTopic: (topicId) => {
				console.log('removedCallback', topicId)
				subscribeToArticles();
			}
		})

		Tracker.autorun(() => {

			$loader.start();

			Meteor.subscribe('topics',
				$ctrl.getReactively('amountOfTopics'),
				$ctrl.getReactively('singleTopicId'), {
					onReady: () => subscribeToArticles()
				});

		})

		let subscribeToArticles = () => {

			let topics = $topicsApi.getWithOffset($ctrl.topicsOffset);
			console.log('subscribeToArticles');
			
			Meteor.subscribe('articles', topics, {
				onReady: () => afterSubscription({ success: true }),
				onError: () => afterSubscription({ success: false })
			})
			const afterSubscription = (subscription) => {
				if ($ctrl.firstInit) {
					$loader.databaseInitialized();
					$ctrl.firstInit = false;
				} else {
					$loader.stop();
				}
				if (subscription.success) {
					$ctrl.topics = topics;
				}
			}
		}

		$ctrl.refreshArticles = (topic) => {
			if (!topic) {
				return;
			}
			return $topicsApi.getById(topic._id).articleIds;
		}

		$ctrl.showDetails = function ($event) {
			$ctrl.detailsAreShown = $event.showDetails;
		}

		$ctrl.loadMoreTopics = () => {
			$ctrl.topicsOffset = $ctrl.topicsOffset + 5;
			$ctrl.amountOfTopics = $ctrl.amountOfTopics + 5;
			checkState();
			$autoScroll.scrollToTop();

			ga('send', {
				hitType: 'event',
				eventCategory: 'Read',
				eventAction: 'Load more topics'
			})
		}

		let checkState = () => {
			if ($state.current.name == 'singleTopic') {
				$state.go('topics')
			}
		}

	}

}

export default {
	controller: TopicsComponent,
	templateUrl: TopicsTemplate,
	bindings: {
		singleTopicId: '<'
	}
}