
import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Topics } from '/imports/api/topics.js';

class TopicsComponent {

	constructor($scope, $reactive, $loader, $articlesApi) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		Meteor.subscribe('topicsAndArticles', {
			onReady: function(){

				$loader.databaseInitialized();
				
				$ctrl.helpers({
					'topics': () => {
						var topics = Topics.find({}, {}).fetch();
						return topics;
					}
				});
		
			}
			
		});

		$ctrl.addLatestUpdateToTopic = function(topic) {
			var articles = $articlesApi.getAllByTopic(topic)
			var latestUpdatedArticle = _.maxBy(articles, 'updatedAt');
			topic.latestUpdate = latestUpdatedArticle.updatedAt;
		}

		$ctrl.showDetails = function($event) {
			console.log($event)
			$ctrl.detailsAreShown = $event.showDetails;
		}
		
	}

}

export default {
    controller: TopicsComponent,
	templateUrl : TopicsTemplate,
	bindings : {}
}