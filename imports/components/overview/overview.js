import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './overview.html';

class OverviewCtrl {

	constructor() {
		
		this.newsItems = [{
			id : 1,
			title: 'VS stapt uit klimaatakkoord',
			category: 'buitenland',
			summaryText : 'President Donald Trump haalt de Verenigde Staten definitief uit het klimaatakkoord van Parijs. Volgens Trump is het akkoord \'een slechte deal\' voor de Amerikaanse burgers en \'niet eerlijk\' voor Amerika. Ook zou het miljoenen banen gaan kosten. Trump zegt vier jaar de tijd te zullen nemen om zich terug te trekken.',
			imgUrl: 'http://static1.persgroep.net/volkskrant/image/b4aa7e95-4f6c-4d5a-9746-911858b73046?width=664&height=374',
			logoUrls : ['assets/logos/europa_nu.png','assets/logos/nos.png','assets/logos/business_insider.png','assets/logos/volkskrant.png','assets/logos/nrc.png','assets/logos/bbc.png','assets/logos/dumpert.png','assets/logos/fox_news.png','assets/logos/elsevier.png']
		}];
		
	}
}

export default angular.module('allpers.overview', [
  angularMeteor
])
  .component('allpersOverview', {
    templateUrl : template,
    controller: OverviewCtrl
  });