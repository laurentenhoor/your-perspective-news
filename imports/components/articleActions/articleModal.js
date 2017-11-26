import angular from 'angular';
import angularMeteor from 'angular-meteor';

import style from'./articleModal.less';

import angularBootstrap from 'angular-ui-bootstrap';


class ArticleModalCtrl {

	constructor($rootScope, $scope, $reactive, $uibModalInstance, topicId, category, article) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.topicId = topicId;
		$ctrl.category = category;
		$ctrl.article = article;
		
		$ctrl.urlDataIsLoaded = false;
		
		
		if ($ctrl.article) {
			
			$ctrl.headerText = 'Wijzig deze bron.';
			$ctrl.headerSubText = 'Verplaats of verwijder deze bron.';

		} else if ($ctrl.category) {

			$ctrl.headerText = 'Voeg een bron toe.';
			$ctrl.headerSubText = 'Verbreed, verdiep of ontwricht dit onderwerp met een interessant artikel.';
			
		} else if (!$ctrl.topic) {
			
			$ctrl.headerText = 'Maak een nieuw(s) item.';
			$ctrl.headerSubText = 'Plaats een onderwerp dat nog niet door ons wordt besproken.';		
			
		} else {

			console.error('Could not succesfully load the modal: the requested inputs are not provided!');
			
		}

		

		$ctrl.clearForm = function() {
			$ctrl.article = null;
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
				
				$ctrl.article.logoUrl = result.logos.clearbit || result.logos.icon;
				$ctrl.article.description = (result['twitter:description'] || result['og:description'] || result['Description'] || result['description'])// .replace(/<\/?[^>]+(>|$)/g,
				// "");
				$ctrl.article.title = (result['gwa_contentTitle'] || result['twitter:title'] || result['og:title'] || result['Title'])// .replace(/<\/?[^>]+(>|$)/g,
				// "");
				$ctrl.article.publisher = result['og:site_name'] || result['application-name'] || result['app-name'];
				
				$ctrl.article.videoUrl = result['twitter:player'];
				
				$ctrl.article.imageUrl = result['og:image'] || result['twitter:image'] || result['twitter:image:src'];
				
				if (result['twitter:player']) {
					$ctrl.article.imageUrl = null;
					$ctrl.article.url = null;
					$ctrl.article.videoUrl = $ctrl.videoUrl + '?&theme=dark&autohide=2&modestbranding=0&fs=1&showinfo=0&rel=0&playsinline=1';
				}
				
				$ctrl.postMetaDataAvailable = true;
				$ctrl.rawMetadata = result;

				$rootScope.stateIsLoading = false;

			});
		}
		
		$ctrl.remove = function(topicId, article) {
			console.log('removeArticle');console.log(article._id);console.log(topicId);
			Meteor.call('removeArticle', topicId, article._id)
			$uibModalInstance.close();
		}

		$ctrl.ok = function () {
			
			console.log($ctrl.article)
			
			if (articleData) {
				Meteor.call('addArticle', articleData.topicId, $ctrl.category, $ctrl.article);
			} else {
				Meteor.call('addArticle', null, $ctrl.category, $ctrl.article);
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
	]).controller('ArticleModalCtrl', 
			['$rootScope', '$scope', '$reactive', '$uibModalInstance',
				'topicId', 'category', 'article', 
				ArticleModalCtrl]
	);