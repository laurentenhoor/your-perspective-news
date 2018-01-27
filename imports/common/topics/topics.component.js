import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Random } from 'meteor/random'

class TopicsComponent {

	constructor($scope, $reactive, $loader, $state, $topicsApi) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.amountOfTopics = 5;
		$ctrl.firstInit = true;

		$ctrl.$onChanges = (changes) => {
			if (changes.singleTopicId) {
				$ctrl.singleTopicId = angular.copy($ctrl.singleTopicId);
			}
		}

		Tracker.autorun(() => {

			$loader.start();

			Meteor.subscribe('topics',
				$ctrl.getReactively('amountOfTopics'),
				$ctrl.getReactively('singleTopicId'), {
					onReady: () => subscribeToArticles()
				});

		})

		subscribeToArticles = () => {
			let topics = $topicsApi.getAll();

			Meteor.subscribe('articles', topics, {
				onReady: () => {

					if ($ctrl.firstInit) {
						$loader.databaseInitialized();
						$ctrl.firstInit = false;
					} else {
						$loader.stop();
					}

					$ctrl.topics = topics;

				}
			})
		}

		$ctrl.showDetails = function ($event) {
			$ctrl.detailsAreShown = $event.showDetails;
		}

		$ctrl.loadMoreTopics = () => {
			$ctrl.amountOfTopics = $ctrl.amountOfTopics + 5;
			checkState();
		}

		function checkState() {
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