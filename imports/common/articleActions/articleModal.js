import angular from 'angular';
import angularMeteor from 'angular-meteor';

import style from'./articleModal.less';

import angularBootstrap from 'angular-ui-bootstrap';

import {name as UrlMetaData} from '/imports/services/UrlMetaData'


class ArticleModalCtrl {

	constructor($rootScope, $scope, $reactive, $uibModalInstance, UrlMetaData, topicId, category, article) {

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.topicId = topicId;
		$ctrl.category = category;		
		$ctrl.article = article;
		
		
		if (category) {
			$ctrl.newCategory = category.category;
		}
		
		if ($ctrl.article) {
			
			$ctrl.mode = 'edit';
			
			$ctrl.headerText = 'Wijzig deze bron.';
			$ctrl.headerSubText = 'Verplaats of verwijder deze bron.';
			$ctrl.urlDataIsLoaded = true;
			

		} else if ($ctrl.category) {

			$ctrl.mode = 'add_source_to_topic';
			
			$ctrl.headerText = 'Voeg een bron toe.';
			$ctrl.headerSubText = 'Verbreed, verdiep of ontwricht dit onderwerp met een interessant artikel.';
			$ctrl.urlDataIsLoaded = false;
			
			
		} else if (!$ctrl.topicId) {
			
			$ctrl.mode = 'new_topic';
			
			$ctrl.newCategory = 'Algemene berichtgeving';
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
					return;
				}
				$ctrl.urlDataIsLoaded = true;
				$ctrl.article = UrlMetaData.createArticle($ctrl.article.url, result);

				console.log($ctrl.article.videoUrl);
				
				$ctrl.postMetaDataAvailable = true;
				$rootScope.stateIsLoading = false;

			});
		}
		
		$ctrl.remove = function(topicId, categoryName, article) {
			console.log('removeArticle');console.log(article._id);console.log(topicId);
			Meteor.call('removeArticleFromCategory', topicId, categoryName, article._id)
			$uibModalInstance.close();
		}
		
		$ctrl.ok = function () {
			
			console.log($ctrl.article)
			
			switch ($ctrl.mode) {
				case 'add_source_to_topic':
					Meteor.call('addArticle', $ctrl.topicId, $ctrl.newCategory, $ctrl.article);
					break;
				case 'new_topic':
					Meteor.call('addArticle', null, $ctrl.newCategory, $ctrl.article);
					break;
				case 'edit':
					console.log('edit');
					Meteor.call('addArticleToCategory', $ctrl.topicId, $ctrl.newCategory, $ctrl.article);
					Meteor.call('removeArticleFromCategory', $ctrl.topicId, $ctrl.category.category, $ctrl.article._id);
					break;
			}
			$uibModalInstance.close($ctrl.feedback);

		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
		
		$ctrl.searchTextChange = function(text) {
		      console.log('Text changed to ' + text);
	    }
		
		$ctrl.selectedItemChange = function(item) {
			console.log('Item changed to ' + JSON.stringify(item));
		}
		
		
		$ctrl.loadAll = function() {
			var map = ('aap, noot, mies').split(/, +/g).map( function (state){
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
		
		
		function isValid(url) {
			
			console.log('isValid()');
			console.log(url);

			var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
			return urlregex.test(url);

		}


	}

}


export default angular.module('yourpers.ArticleModalCtrl', [
	angularMeteor,
	angularBootstrap,
	UrlMetaData,
	]).controller('ArticleModalCtrl', 
			['$rootScope', '$scope', '$reactive', '$uibModalInstance', 'UrlMetaData',
				'topicId', 'category', 'article', 
				ArticleModalCtrl]
	);