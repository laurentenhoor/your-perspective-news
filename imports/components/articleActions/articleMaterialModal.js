import angular from 'angular';
import angularMeteor from 'angular-meteor';

import style from'./articleMaterialModal.less';

class ArticleModalCtrl {

	constructor($rootScope, $scope, $reactive, $mdDialog, topicId, category, article) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);
		
		console.log('init ArticleModalCtrl Material Version');
		
		$ctrl.topicId = topicId;
		$ctrl.category = category;		
		$ctrl.article = article;
		
		console.log($ctrl.topicId);
		
		if (category) {
			$ctrl.newCategory = category.category;
		}
		
		if ($ctrl.article) {
			
			$ctrl.mode = 'edit';
			
			$ctrl.headerText = 'Wijzig deze bron.';
			$ctrl.headerSubText = 'Verander de categorie of verwijder deze bron.';
			$ctrl.urlDataIsLoaded = true;
			

		} else if ($ctrl.category) {

			$ctrl.mode = 'add_source_to_topic';
			
			$ctrl.headerText = 'Voeg een bron toe.';
			$ctrl.headerSubText = 'Verbreed, verdiep of ontwricht dit onderwerp met een interessant artikel.';
			$ctrl.urlDataIsLoaded = false;
			
			
		} else if (!$ctrl.topicId) {
			
			$ctrl.mode = 'new_topic';
			
//			$ctrl.newCategory = 'Algemene berichtgeving';
			$ctrl.headerText = 'Maak een nieuw(s) item.';
			$ctrl.headerSubText = 'Plaats een onderwerp dat nog niet door ons wordt besproken.';	
			$ctrl.urlDataIsLoaded = false;
			
			
		} else {

			console.error('Could not succesfully load the modal: the requested inputs are not provided!');
			
		}

		
		$ctrl.urlChange = function() {

			console.log('url input changed');
			console.log($ctrl.article.url)

			
			if (!isValid($ctrl.article.url)) {
				return;
			}
			$rootScope.stateIsLoading = true;

			$ctrl.call('getUrlMetadata', $ctrl.article.url, function(error, result) {
				
				$scope.$apply(function() {
					$rootScope.stateIsLoading = false;
				});

				if(error) {
					console.error(error);
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
				
				$ctrl.article.publishedAt = result['article:published'];
				
				$ctrl.article.videoUrl = result['twitter:player'];
				
				$ctrl.article.imageUrl = result['og:image'] || result['twitter:image'] || result['twitter:image:src'];
				
				if (result['twitter:player']) {
					$ctrl.article.imageUrl = result['twitter:image'];
					$ctrl.article.url = null;
					$ctrl.article.videoUrl = $ctrl.article.videoUrl + '?&theme=dark&autohide=2&modestbranding=0&fs=1&showinfo=0&rel=0&playsinline=1';
					if ($ctrl.article.publisher == 'YouTube') {
						$ctrl.article.logoUrl = 'https://logo.clearbit.com/www.youtube.com';
						
					}
				}
				
				console.log($ctrl.article.videoUrl);
				
				$ctrl.postMetaDataAvailable = true;
				$ctrl.rawMetadata = result;

				$rootScope.stateIsLoading = false;

			});
		}
		
		
		function isValid(url) {
			
			console.log('isValid()');
			console.log(url);

			var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
			return urlregex.test(url);

		}

		
		
		$ctrl.searchTextChange = function(text) {
		      console.log('Text changed to ' + text);
	    }
		
		$ctrl.selectedItemChange = function(item) {
			console.log('Item changed to ' + JSON.stringify(item));
		}

		
		$ctrl.cancel = function() {
		      $mdDialog.cancel();

		}
		
		$ctrl.loadAll = function() {
			var map = ('Algemene berichtgeving, Andere kijk, Entertainment').split(/, +/g).map( function (state){
		        return {
		            value: state.toLowerCase(),
		            display: state
		          };
		        });
			console.log(map)
			return map;
		}
		
		$ctrl.categories = $ctrl.loadAll();
		
		 function createFilterFor(query) {
		      var lowercaseQuery = angular.lowercase(query);

		      return function filterFn(state) {
		        return (state.value.indexOf(lowercaseQuery) === 0);
		      };

		    }
		
		
		$ctrl.querySearch = function(query) {
			
			console.log('query: ' + query);
			console.log($ctrl.categories);
			
		      var results = query ? $ctrl.categories.filter( createFilterFor(query) ) : $ctrl.categories,
		              deferred;
		      
		      console.log(results);
		         
		      return results;
		          
		 }

	}

}


export default angular.module('yourpers.ArticleModalCtrl', [
	angularMeteor,
	]).controller('ArticleModalCtrl', 
			['$rootScope', '$scope', '$reactive', '$mdDialog',
				'topicId', 'category', 'article', 
				ArticleModalCtrl]
	);