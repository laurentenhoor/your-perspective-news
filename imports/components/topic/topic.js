'use strict';

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngRoute from 'angular-route';
import template from './topic.html';

export default angular.module('allpers.topic', [angularMeteor, ngRoute])

.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/topic', {
		templateUrl: 'imports/components/topic/topic.html',
		controller: 'TopicCtrl'
	});
  
}])

.controller('TopicCtrl', ['$scope', '$location', function($scope, $location) {

	$scope.title = 'VS stapt uit klimaatakkoord';
	
	$scope.newsItems = [{
		itemid : 1,
		title : 'Het klimaat akkoord',
		type : 'text',
		articleUrl : 'https://www.europa-nu.nl/id/vjmhg41ub7pp/klimaatconferentie_parijs_2015_cop21',
		imgUrl : '',
		logoUrl : 'assets/logos/europa_nu.png',
		summaryText : 'Wat is er eigenlijk door wie afgesproken in het klimaatakkoord? Lees deze samenvatting en je bent helemaal up-to-date!'
	}, {
		itemid : 1,
		title : '0,3°C',
		type : 'text',
		articleUrl : 'http://nos.nl/artikel/2176295-0-3-graden-warmer-door-klimaatbesluit-vs.html',
		imgUrl : '',
		logoUrl : 'assets/logos/nos.png',
		summaryText : 'Volgens de VN-klimaat organisatie WMO warmt de aarde 0,3°C extra op door het vertrek van de VS. Ofwel, de consequenties zijn huge'
	}, {
		itemid : 1,
		title : 'Vijf feiten',
		type : 'text',
		articleUrl : 'https://www.businessinsider.nl/factcheck-5-beweringen-van-donald-trump-het-klimaatakkoord-van-parijs/',
		imgUrl : '',
		logoUrl : 'assets/logos/business_insider.png',
		summaryText : 'In zijn persconferentie gaf Trump verschillende redenen om uit het klimaatakkoord te stappen. Hierop valt echter nog al wat af te dingen ...'
	}, {
		itemid : 1,
		title : 'Trump doctrine',
		type : 'text',
		articleUrl : 'https://www.businessinsider.nl/factcheck-5-beweringen-van-donald-trump-het-klimaatakkoord-van-parijs/',
		imgUrl : 'http://static1.persgroep.net/volkskrant/image/b4aa7e95-4f6c-4d5a-9746-911858b73046?width=664&height=374',
		logoUrl : 'assets/logos/volkskrant.png',
		summaryText : 'Waarom het terugtrekken uit het klimaatakkoord niet op zichzelf staat en we meer kunnen verwachten.'
	}, {
		itemid : 1,
		title : 'Kritiek',
		type : 'text',
		articleUrl : 'https://www.nrc.nl/nieuws/2017/06/02/harde-kritiek-op-trumps-exit-parijs-akkoord-a1561483/',
		imgUrl : '',
		logoUrl : 'assets/logos/nrc.png',
		summaryText : 'Niet alleen regeringsleiders zijn geschrokken van de terugtrekking, ook CEOs (zelfs die van Goldman Sachs) spreekt zich uit tegen de beslissing van Trump.'
	}, {
		itemid : 1,
		title : 'Macron',
		type : 'video',
		articleUrl : 'https://www.youtube.com/watch?v=4XDWtU1Zojw',
		imgUrl : 'http://cfvod.kaltura.com/p/1467261/sp/146726100/thumbnail/entry_id/1_qbdhur2d/version/100011/width/641/height/397',
		logoUrl : 'assets/logos/bbc.png',
		summaryText : 'Deze reactie van de kersverse president Macron ging viral, met inmiddels al 13 miljoen views!'
	}, {
		itemid : 1,
		title : 'Stortvloed',
		type : 'video',
		articleUrl : 'https://www.dumpert.nl/embed/7151309/d6dce568/?autoplay=1',
		imgUrl : '',
		logoUrl : 'assets/logos/dumpert.png',
		summaryText : 'De gevolgen van het Trump beleid komen wel erg snel...'
	}, {
		itemid : 1,
		title : 'Moed',
		type : 'text',
		articleUrl : 'http://www.foxnews.com/opinion/2017/06/01/trump-pulls-out-paris-climate-deal-and-does-something-right-and-brave.html',
		imgUrl : '',
		logoUrl : 'assets/logos/fox_news.png',
		summaryText : 'Het besluit om de VS terug te trekken uit het akkoord is niet alleen het juiste besluit, het laat ook zien dat Trump moed heeft.',
	}, {
		itemid : 1,
		title : 'Verstandig',
		type : 'text',
		articleUrl : 'http://www.elsevierweekblad.nl/opinie/opinie/2017/06/opzeggen-klimaatverdrag-zou-best-verstandig-besluit-zijn-van-trump-509384/',
		imgUrl : '',
		logoUrl : 'assets/logos/elsevier.png',
		summaryText : 'Het klimaatakkoord kost veel en levert nagenoeg niets op, dus eruit stappen is een van de weinig verstandige besluiten van Trump.'
	}];
	
}]);