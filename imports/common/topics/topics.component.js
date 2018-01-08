
import TopicsTemplate from './topics.html';
import TopicsStyle from './topics.styl';

import { Topics } from '/imports/api/topics.js';

class TopicsComponent {

	constructor($scope, $reactive, $loader) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		Meteor.subscribe('topicsAndArticles', {
			onReady: function(){

				$loader.databaseInitialized();
				
				$ctrl.helpers({
					'topics': () => {
						return Topics.find({}, {}).fetch();;
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

export default {
    controller: TopicsComponent,
	templateUrl : TopicsTemplate,
	bindings : {}
}