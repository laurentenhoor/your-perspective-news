import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as yourpersAddArticle} from '../addArticle/addArticle';

import template from './bulletin.html';
import style from './bulletin.less';


class BulletinCtrl {
	
	constructor($rootScope, $scope, $reactive, $window) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);	
		
		$ctrl.articleBlocks = [{
			category : 'Algemene berichtgeving', 
			articles : [{
				logoUrl: 'https://logo.clearbit.com/www.nrc.nl',
				title: "Harde kritiek op Trumps exit Parijs-akkoord",
				description: "Regeringsleiders en invloedrijke CEO’s uit het bedrijfsleven reageren zeer teleurgesteld op de beslissing van president Trump om te stoppen met het klimaatakkoord van Parijs.",
				publisher: 'NRC',
				url: "https://www.nrc.nl/nieuws/2017/06/02/harde-kritiek-op-trumps-exit-parijs-akkoord-a1561483",
				imageUrl: 'https://images.nrc.nl/3xdswAvTyDuBNeAXCe6y8w3ZCck=/1200x627/smart/filters:no_upscale\\(\\)/s3/static.nrc.nl/wp-content/uploads/2017/06/5809284a-2e2d-4791-8461-cc590545ff35.jpg'
			},{
				logoUrl: 'https://logo.clearbit.com/www.volkskrant.nl',
				title: "Trumps klimaatbesluit bevestigt zijn doctrine: Amerika tegen de rest",
				description: "De bijna tweehonderd landen die zich hebben verenigd in de strijd tegen de opwarming van de aarde moeten het voorlopig doen zonder Amerika. President Donald Trump joeg donderdag de kogel door de kerk en trekt de VS terug uit het akkoord van Parijs.",
				publisher: 'De Volkskrant',
				url: "https://www.volkskrant.nl/buitenland/vs-stappen-uit-klimaatakkoord-parijs-duitsland-en-frankrijk-willen-niet-heronderhandelen~a4498499/",
				imageUrl: 'https://static0.persgroep.net/volkskrant/image/f50a559f-ad8c-49f2-a32d-8657312c25f6?width=700'
			},{
				logoUrl: 'https://logo.clearbit.com/www.businessinsider.nl',
				title: "Factcheck: 5 beweringen van Donald Trump over het klimaatakkoord van Parijs",
				description: "Op de argumenten die president Donald Trump gaf om zich terug te trekken uit het klimaatakkoord van Parijs, valt het nodige af te dingen.",
				publisher: 'Business Insider',
				url:"https://www.businessinsider.nl/factcheck-5-beweringen-van-donald-trump-het-klimaatakkoord-van-parijs/",
				imageUrl: '739260475b008ad88fb5090632ee47e0caf20233-400x255.jpg'
			},{
				logoUrl: 'https://logo.clearbit.com/nos.nl',
				 title : "'0,3 graden warmer door klimaatbesluit VS'",
				 url : "https://nos.nl/artikel/2176295-0-3-graden-warmer-door-klimaatbesluit-vs.html",
				 description : "Het gaat om een schatting van de VN-klimaatorganisatie WMO.",
				imageUrl: 'https://nos.nl/data/image/2017/06/02/390267/xxl.jpg',
				publisher: 'NOS'
			},{
				logoUrl: 'https://logo.clearbit.com/youtube.com',
				 title : "France's President Macron calls on the world to \"make our planet great again\" - BBC News",
				 videoUrl : "https://www.youtube.com/embed/4XDWtU1Zojw?&theme=dark&autohide=2&modestbranding=0&fs=1&showinfo=0&rel=0&playsinline=1",
				 description : "",
				publisher: 'Youtube'
			}]
		},{
			category : 'Andere kijk',
			articles : [{
				logoUrl: 'https://logo.clearbit.com/www.elsevierweekblad.nl',
				title: "Opzeggen klimaatverdrag is best verstandig besluit",
				description: "Dat de Amerikaanse president Donald Trump uit het klimaatakkoord van Parijs stapt, is een verstandig besluit – misschien wel zijn eerste verstandige besluit - Kennis, Opinie",
				url: "http://www.elsevierweekblad.nl/opinie/opinie/2017/06/opzeggen-klimaatverdrag-zou-best-verstandig-besluit-zijn-van-trump-509384/",
				publisher: 'Elsevier Weekblad',
				imageUrl: 'http://cdn.prod.elseone.nl/uploads/2017/06/ANP-51680916-2048x1220.jpg'
			},{
				logoUrl: 'https://logo.clearbit.com/www.foxnews.com',
				 title : "Trump pulls out of Paris climate deal and does something right (and brave)",
				 url : "http://www.foxnews.com/opinion/2017/06/01/trump-pulls-out-paris-climate-deal-and-does-something-right-and-brave.html",
				 description : "By withdrawing from the Paris climate agreement, President Trump is defying the left, the media, his children, and many world leaders.",
				imageUrl: '//a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2017/06/01/0/0/694940094001_5456104729001_5456049982001-vs.jpg?ve=1',
				publisher: 'FOX News'
			}]
		}, {
			category: 'Satire',
			articles : [{
				logoUrl: 'https://botw-pd.s3.amazonaws.com/styles/logo-original-577x577/s3/062013/dumpert_0.png?itok=EWtSnwGw',
				 title : "De gevolgen van het Trump beleid komen wel heel snel...",
				 url : "",
				 description : "",
				imageUrl: '',
				videoUrl: 'https://www.dumpert.nl/embed/7151309/d6dce568/?rel=0&autoplay=0&setfullscreen=1&allowfullscreen=1',
				publisher: 'Dumpert'
			},{
				logoUrl: 'https://logo.clearbit.com/9gag.com',
				title: "Ondertussen in China...",
				description: "",
				url: "https://9gag.com/gag/aM8gKYX",
				publisher: '9gag',
				imageUrl: 'https://img-9gag-fun.9cache.com/photo/aM8gKYX_700b.jpg'
			}]
		}];
		
		$ctrl.selectedArticle = {};
		
		$ctrl.clickArticle = function(category, article) {
			$ctrl.selectedArticle[category] = article;
		}

		angular.forEach($ctrl.articleBlocks, function(articleBlock, i){
			$ctrl.clickArticle(articleBlock.category, articleBlock.articles[0])
		}); 
		
	}

}


export default angular.module('yourpers.bulletin', [
	angularMeteor,
	yourpersAddArticle
	])
	.component('yourpersBulletin', {
		templateUrl : template,
		controller: ['$rootScope', '$scope', '$reactive', '$window', BulletinCtrl]
	});