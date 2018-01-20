
import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Topics } from '/imports/api/topics.js';

class TopicsComponent {

	constructor($scope, $reactive, $loader, $articlesApi, $timeout) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.amountOfTopics = 5;
		$ctrl.yesterday = false;

		$ctrl.firstInit = true;

		Tracker.autorun(() => {

			Meteor.subscribe('topicsAndArticles',
				$ctrl.getReactively('amountOfTopics'),
				$ctrl.getReactively('yesterday'), {

					onReady: function () {
						if ($ctrl.firstInit) {
							$loader.databaseInitialized();
							$ctrl.firstInit = false;
							
						} else {
							$loader.stop();
						}
						
						$ctrl.helpers({
							'topics': () => {
								return Topics.find({}).fetch();;
							}
						});

					}

				});

		});


		$ctrl.addLatestUpdateToTopic = function (topic) {
			var articles = $articlesApi.getAllByTopic(topic)
			var latestUpdatedArticle = _.maxBy(articles, 'updatedAt');
			topic.latestUpdate = latestUpdatedArticle.updatedAt;
		}

		$ctrl.showDetails = function ($event) {
			$ctrl.detailsAreShown = $event.showDetails;
		}

		$ctrl.loadMoreTopics = () => {
			$loader.start();
			$ctrl.amountOfTopics = $ctrl.amountOfTopics + 5;
		}

		$ctrl.toggleYesterday = () => {
			$loader.start();
			$ctrl.yesterday = !$ctrl.yesterday;
			$ctrl.amountOfTopics = 5;
		}

		$ctrl.loadAllTopics = () => {
			$loader.start();
			$ctrl.amountOfTopics = $ctrl.amountOfTopics + 5;
			$ctrl.yesterday = null;
		}

	}

}

export default {
	controller: TopicsComponent,
	templateUrl: TopicsTemplate,
	bindings: {}
}