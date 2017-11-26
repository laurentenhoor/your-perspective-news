import angular from 'angular';
import angularMeteor from 'angular-meteor';

import style from'./articleModal.less';

import angularBootstrap from 'angular-ui-bootstrap';


class ArticleModalCtrl {

	constructor($rootScope, $scope, $reactive, $uibModalInstance, articleData, isEditMode) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.articleData = articleData;
		$ctrl.isEditMode = isEditMode;
		
		$ctrl.urlDataIsLoaded = false;
		
		console.log(isEditMode)
		console.log(articleData)
		
		
		if (!$ctrl.articleData) {

			$ctrl.headerText = 'Maak een nieuw(s) item.';
			$ctrl.headerSubText = 'Plaats een onderwerp dat nog niet door ons wordt besproken.';		

			$ctrl.category = 'Algemene berichtgeving';

		} else if ('category' in $ctrl.articleData) {

			$ctrl.headerText = 'Voeg een bron toe.';
			$ctrl.headerSubText = 'Verbreed, verdiep of ontwricht dit onderwerp met een interessant artikel.';

			$ctrl.category =  $ctrl.articleData.category;
		}
		
		if (isEditMode) {
			
			$ctrl.headerText = 'Wijzig deze bron.';
			$ctrl.headerSubText = 'Verplaats of verwijder deze bron.';

			$ctrl.category =  $ctrl.articleData.category;			
			
		}
		

		$ctrl.clearForm = function() {

			$ctrl.postMetaDataAvailable = false;
			$ctrl.imageUrl = '';
			$ctrl.logoUrl = '';
			$ctrl.description = '';
			$ctrl.title = '';
			$ctrl.publisher = '';	
			$ctrl.userMessage = '';

		}

		$ctrl.urlChange = function() {

			console.log('url input changed');
			console.log($ctrl.url)

			$ctrl.clearForm();

			if (!isValid($ctrl.url)) {
				return;
			}
			$rootScope.stateIsLoading = true;

			$ctrl.call('getUrlMetadata', $ctrl.url, function(error, result) {

				$scope.$apply(function() {
					$rootScope.stateIsLoading = false;
				});

				if(error) {
					return;
				}

				$ctrl.urlDataIsLoaded = true;

				console.log(result);
				
				$ctrl.logoUrl = result.logos.clearbit || result.logos.icon;
				$ctrl.description = (result['twitter:description'] || result['og:description'] || result['Description'] || result['description'])// .replace(/<\/?[^>]+(>|$)/g,
				// "");
				$ctrl.title = (result['gwa_contentTitle'] || result['twitter:title'] || result['og:title'] || result['Title'])// .replace(/<\/?[^>]+(>|$)/g,
				// "");
				$ctrl.publisher = result['og:site_name'] || result['application-name'] || result['app-name'];
				
				$ctrl.videoUrl = result['twitter:player'];
				
				$ctrl.imageUrl = result['og:image'] || result['twitter:image'] || result['twitter:image:src'];
				
				if (result['twitter:player']) {
					$ctrl.imageUrl = null;
					$ctrl.url = null;
					$ctrl.videoUrl = $ctrl.videoUrl + '?&theme=dark&autohide=2&modestbranding=0&fs=1&showinfo=0&rel=0&playsinline=1';
				}
				
				$ctrl.postMetaDataAvailable = true;
				$ctrl.rawMetadata = result;

				$rootScope.stateIsLoading = false;

			});


		}


		$ctrl.ok = function () {

			var article = {
					
					videoUrl : $ctrl.videoUrl,
					imageUrl: $ctrl.imageUrl,
					logoUrl: $ctrl.logoUrl,
					description: $ctrl.description,
					title: $ctrl.title,
					publisher: $ctrl.publisher,
					url : $ctrl.url,
				
//					rawMetadata: $ctrl.rawMetadata,

			}

			console.log(article)
			
			if (articleData) {
				Meteor.call('addArticle', articleData.topicId, $ctrl.category, article);
			} else {
				Meteor.call('addArticle', null, $ctrl.category, article);
			}
			$uibModalInstance.close($ctrl.feedback);


		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		function isValid(url) {

			var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
			return urlregex.test(url);

		}


	}

}


export default angular.module('yourpers.ArticleModalCtrl', [
	angularMeteor,
	angularBootstrap
	]).controller('ArticleModalCtrl', ['$rootScope', '$scope', '$reactive', '$uibModalInstance','articleData', ArticleModalCtrl])