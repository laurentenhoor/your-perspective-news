import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Random } from 'meteor/random'

class TopicsComponent {

	constructor($scope, $reactive, $loader, $daySelector, $state, $articlesApi, $topicsApi, $questionsApi, $timeout, smoothScroll, $desktopViewer, $joinDialog, $writeOpinionDialog) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.isDesktop = $desktopViewer.isDesktop;

		$ctrl.daySelector = $daySelector;
		$ctrl.firstInit = true;

		let temporaryHighestHotness = 9999;

		var filterPublishDate = function (val) {
			$ctrl.amountOfFilteredTopics = 0;
			return (val.publishAt > $daySelector.minDate && val.publishAt < $daySelector.maxDate);
		};

		$ctrl.$onChanges = (changes) => {
			if (changes.singleTopicId && $ctrl.topicId) {

				if ($state.current.name == 'singleTopic') {

					$ctrl.singleTopicId = $ctrl.topicId
					$daySelector.initSingleTopicMode();
					$ctrl.filterPublishDate = (val) => { return val }

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

				if ($state.current.name == 'question') {
					
					$ctrl.singleTopicId = $ctrl.topicId;
					$daySelector.initSingleTopicMode();
					$ctrl.filterPublishDate = (val) => { return val }

					ga('send', {
						hitType: 'event',
						eventCategory: 'Share Question',
						eventAction: 'Conversion',
						eventLabel: '/question/' + $ctrl.questionId
					})
				}
			}
			if ($state.current.name == 'topics') {
				$ctrl.filterPublishDate = filterPublishDate;
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
				$ctrl.openTopicId = null;
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

			console.log('subscribe to articles from these topics', topics)

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


        $ctrl.clickJoin = ($event) => {
            $joinDialog.show($event);
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Open "Word verrijker"',
            })
        }

        $ctrl.clickTips = ($event) => {
            $writeOpinionDialog.show($event)
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Open "Verrijkingsverzoek"'
            })
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