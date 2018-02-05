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

		let temporaryHighestHotness = 9999;

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
				let newTopic = $topicsApi.getById(topicId);
				newTopic.stats.hotness = temporaryHighestHotness++;		
				let newTopics = [].concat($ctrl.topics)
				newTopics.push(newTopic);
				subscribeToArticles(newTopics);
			},
			removedTopic: (topicId) => {
				console.log('removedCallback', topicId)
				subscribeToArticles($topicsApi.getWithOffset($ctrl.topicsOffset));
			}
		})

		Tracker.autorun(() => {

			$loader.start();

			Meteor.subscribe('topics',
				$ctrl.getReactively('amountOfTopics'),
				$ctrl.getReactively('singleTopicId'), {
					onReady: () => subscribeToArticles($topicsApi.getWithOffset($ctrl.topicsOffset))
				});

		})

		let subscribeToArticles = (topics) => {

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
					console.log('newTopics', $ctrl.topics)
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