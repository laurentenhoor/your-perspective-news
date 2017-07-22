import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './topic.html';
import style from './topic.less';

class TopicCtrl {

	constructor($scope) {
		
		$scope.viewModel(this);

		this.title = 'VS stapt uit klimaatakkoord';

		this.helpers({
			currentUser() {
				return Meteor.user();
			}
		});
		
		this.newsItems = [
			{articleUrl : 'https://www.europa-nu.nl/id/vjmhg41ub7pp/klimaatconferentie_parijs_2015_cop21'}, 
			{articleUrl : 'http://nos.nl/artikel/2176295-0-3-graden-warmer-door-klimaatbesluit-vs.html'}, 
			{articleUrl : 'https://www.businessinsider.nl/factcheck-5-beweringen-van-donald-trump-het-klimaatakkoord-van-parijs/'}, 
			{articleUrl : 'http://www.volkskrant.nl/buitenland/vs-stappen-uit-klimaatakkoord-parijs-duitsland-en-frankrijk-willen-niet-heronderhandelen~a4498499/'}, 
			{articleUrl : 'https://www.nrc.nl/nieuws/2017/06/02/harde-kritiek-op-trumps-exit-parijs-akkoord-a1561483/'}, 
			{articleUrl : 'https://www.youtube.com/embed/4XDWtU1Zojw'}, 
			{articleUrl : 'https://www.dumpert.nl/embed/7151309/d6dce568/?autoplay=1'}, 
			{articleUrl : 'http://www.foxnews.com/opinion/2017/06/01/trump-pulls-out-paris-climate-deal-and-does-something-right-and-brave.html'}, 
			{articleUrl : 'http://www.elsevierweekblad.nl/opinie/opinie/2017/06/opzeggen-klimaatverdrag-zou-best-verstandig-besluit-zijn-van-trump-509384/'}
		];
	
		Meteor.call('getMetaData', this.newsItems[0].articleUrl, function(error, result) {
			console.log(result);

			$scope.$apply();
			
		});

	
	}

}


export default angular.module('allpers.topic', [
angularMeteor
])
.component('allpersTopic', {
	templateUrl : template,
	controller: ['$scope', TopicCtrl]
});