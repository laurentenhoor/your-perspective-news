import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Topics } from '/imports/api/topics.js';
import { Random } from 'meteor/random'

class TopicsComponent {

	constructor($scope, $reactive, $loader, $articlesApi, $timeout, $state) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.$onChanges = (changes) => {
			if (changes.singleTopicId) {
				$ctrl.singleTopicId = angular.copy($ctrl.singleTopicId);
				if ($ctrl.singleTopicId) {
					$ctrl.yesterday = null;
				}
			}
		}

		$ctrl.amountOfTopics = 5;
		$ctrl.yesterday = false;
		$ctrl.firstInit = true;
		$ctrl.displayMoreButton = true;
		
		Tracker.autorun(() => {

			$loader.start();

			Meteor.subscribe('topics',
				$ctrl.getReactively('amountOfTopics'),
				$ctrl.getReactively('yesterday'),
				$ctrl.getReactively('singleTopicId'),{
					onReady: ()=>{
						if (!$ctrl.topics){
							$ctrl.displayMoreButton = false;
							return;
						}
						let amountOfTopics = Topics.find({}).fetch().length;
						if (amountOfTopics == $ctrl.topics.length  || amountOfTopics == 0) {
							$loader.stop();
							$ctrl.displayMoreButton = false;
						} else {
							$ctrl.displayMoreButton = true;
						}
					}
				})
		});

		Tracker.autorun(() => {
			var topics = Topics.find({}).fetch()
			
			Meteor.subscribe('articles', topics, {
				onReady: () => {

					$ctrl.topics = topics;

					if ($ctrl.firstInit) {
						$loader.databaseInitialized();
						$ctrl.firstInit = false;
					} else {
						$loader.stop();
					}
				}
			})
		})


		$ctrl.addLatestUpdateToTopic = function (topic) {
			var articles = $articlesApi.getByTopic(topic)
			if (articles.length == 0) {
				return;
			}
			var latestUpdatedArticle = _.maxBy(articles, 'updatedAt');
			topic.latestUpdate = latestUpdatedArticle.updatedAt;
		}

		$ctrl.showDetails = function ($event) {
			$ctrl.detailsAreShown = $event.showDetails;
		}

		$ctrl.loadMoreTopics = () => {
			$ctrl.amountOfTopics = $ctrl.amountOfTopics + 5;
			checkState();
		}

		$ctrl.toggleYesterday = () => {
			$ctrl.allTimeFavoritesMode = false;
			$ctrl.yesterday = !$ctrl.yesterday;
			$ctrl.amountOfTopics = 5;
			checkState();
		}

		$ctrl.loadAllTopics = () => {
			$ctrl.allTimeFavoritesMode = true;
			$ctrl.amountOfTopics = 5;
			$ctrl.yesterday = null;
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