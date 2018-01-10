
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

						_.forEach(topics, (topic, i) => {
							var articles = $articlesApi.getAllByTopic(topic)
							var latestUpdatedArticle = _.maxBy(articles, 'updatedAt');
							topics[i].latestUpdate = latestUpdatedArticle.updatedAt;
						});
						
						return topics;
					}
				});
		
			}
			
		});

		$ctrl.showDetails = function($event) {
			console.log($event)
			$ctrl.detailsAreShown = $event.showDetails;
		}
		
	}

}


function addLatestUpdateToTopic(topic, articles) {
	
                        console.log(latestUpdate);
}

export default {
    controller: TopicsComponent,
	templateUrl : TopicsTemplate,
	bindings : {}
}