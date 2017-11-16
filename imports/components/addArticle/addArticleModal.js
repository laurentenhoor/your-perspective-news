import angular from 'angular';
import angularMeteor from 'angular-meteor';

import style from'./addArticleModal.less';

import angularBootstrap from 'angular-ui-bootstrap';


class AddArticleModalCtrl {
	
	constructor($rootScope, $scope, $reactive, $uibModalInstance, articleData) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		$ctrl.articleData = articleData;
		
		if (!$ctrl.articleData) {
			
			$ctrl.headerText = 'Maak een nieuw(s) item.';
			$ctrl.headerSubText = 'Plak een url naar een artikel.';		
			
			$ctrl.category = 'Algemene berichtgeving';
			
		} else if ('category' in $ctrl.articleData) {
			
			$ctrl.headerText = 'Voeg een bron toe.';
			$ctrl.headerSubText = 'Plak een url naar een artikel.';
			
			
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
				
				console.log(result);
				
				$ctrl.imageUrl = result['og:image'] || result['twitter:image'] || result['twitter:image:src'];
				$ctrl.logoUrl = result.logos.clearbit || result.logos.icon;
				$ctrl.description = (result['twitter:description'] || result['og:description'] || result['Description'] || result['description'])//.replace(/<\/?[^>]+(>|$)/g, "");
				$ctrl.title = (result['gwa_contentTitle'] || result['twitter:title'] || result['og:title'] || result['Title'])//.replace(/<\/?[^>]+(>|$)/g, "");
				$ctrl.publisher = result['og:site_name'] || result['application-name'];
				$ctrl.postMetaDataAvailable = true;
				$ctrl.rawMetadata = result;
				
				$rootScope.stateIsLoading = false;
				
			});
		
		
		}
		
		
		$ctrl.ok = function () {
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


export default angular.module('yourpers.addArticleModalCtrl', [
	angularMeteor,
	angularBootstrap
]).controller('AddArticleModalCtrl', ['$rootScope', '$scope', '$reactive', '$uibModalInstance','articleData', AddArticleModalCtrl])