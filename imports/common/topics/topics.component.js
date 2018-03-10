import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Random } from 'meteor/random'

class TopicsComponent {

	constructor($scope, $reactive, $loader, $daySelector, $state, $articlesApi, $topicsApi, $questionsApi, $timeout, smoothScroll, $desktopViewer) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.isDesktop = $desktopViewer.isDesktop;

		$ctrl.daySelector = $daySelector;
		$ctrl.firstInit = true;

		let temporaryHighestHotness = 9999;

		$ctrl.filterPublishDate = function(val) {
			return (val.publishAt > $daySelector.minDate && val.publishAt < $daySelector.maxDate);
		  };

		$ctrl.$onChanges = (changes) => {
			if (changes.singleTopicId && $ctrl.topicId) {
				$ctrl.singleTopicId = $ctrl.topicId
				if ($state.current.name == 'singleTopic') {
					ga('send', {
						hitType: 'event',
						eventCategory: 'Share Topic',
						eventAction: 'Conversion',
						eventLabel: '/topic/' + $ctrl.singleTopicId
					})
				}
			}
			if (changes.questionId && changes.topicId) {
				let question = $questionsApi.getById($ctrl.questionId);
				$ctrl.singleTopicId = $ctrl.topicId;

				if ($state.current.name == 'question') {
					ga('send', {
						hitType: 'event',
						eventCategory: 'Share Question',
						eventAction: 'Conversion',
						eventLabel: '/question/' + $ctrl.questionId
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
				$ctrl.topics = $topicsApi.getAll();
				subscribeToArticles($ctrl.topics);
			}
		})

		Tracker.autorun(() => {
			
			$loader.start();

			Meteor.subscribe('topicsByTime',
				$ctrl.getReactively('daySelector.minDate'),
				$ctrl.getReactively('daySelector.maxDate'),
				$ctrl.getReactively('singleTopicId'), {
					onReady: () => subscribeToArticles($topicsApi.getAll())
				});

		})

		let subscribeToArticles = (topics) => {

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


		let checkState = () => {
			if ($state.current.name != 'topics') {
				$state.go('topics')
			}
		}

	}

}

export default {
	controller: TopicsComponent,
	templateUrl: TopicsTemplate,
	bindings: {
		singleTopicId: '<',
		questionId: '<',
		topicId: '<'
	}
}