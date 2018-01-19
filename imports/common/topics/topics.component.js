
import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Topics } from '/imports/api/topics.js';

class TopicsComponent {

	constructor($scope, $reactive, $loader, $articlesApi) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.amountOfTopics = 2;
		$ctrl.yesterday = false;

		Tracker.autorun(() => {

			Meteor.subscribe('topicsAndArticles',
				$ctrl.getReactively('amountOfTopics'),
				$ctrl.getReactively('yesterday'), {

					onReady: function () {
						$loader.databaseInitialized();

						$ctrl.helpers({
							'topics': () => {
								console.log('loadTopics')
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
			$ctrl.amountOfTopics = $ctrl.amountOfTopics + 5;
		}

		$ctrl.toggleYesterday = () => {
			$ctrl.yesterday = !$ctrl.yesterday;
			$ctrl.amountOfTopics = 5;
		}

		$ctrl.loadAllTopics = () => {
			$ctrl.amountOfTopics = 50;
			$ctrl.yesterday = null;
		}

	}

}

export default {
	controller: TopicsComponent,
	templateUrl: TopicsTemplate,
	bindings: {}
}