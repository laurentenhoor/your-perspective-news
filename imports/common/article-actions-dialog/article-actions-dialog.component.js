export default class ArticleModalCtrl {

	constructor($loader, $scope, $reactive, $document, $mdDialog, $metadata, topicId, category, article) {
		'ngInject';

		var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.topicId = topicId;
		$ctrl.category = category;
		$ctrl.article = article;

		if (category) {
			$ctrl.initialCategory = category.category;	
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

			$ctrl.headerText = 'Maak een nieuw(s) item.';
			$ctrl.headerSubText = 'Plaats een onderwerp dat nog niet door ons wordt besproken.';
			$ctrl.urlDataIsLoaded = false;


		} else if ($ctrl.topicId) {

			$ctrl.mode = 'add_source_to_topic';

			$ctrl.headerText = 'Voeg een bron toe.';
			$ctrl.headerSubText = 'Verbreed, verdiep of ontwricht dit onderwerp met een interessant artikel.';
			$ctrl.urlDataIsLoaded = false;
		
		} else {

			console.error('Could not succesfully load the modal: the requested inputs are not provided!');
			
		}


		$ctrl.urlChange = function () {

			console.log('Url input changed to:');
			console.log($ctrl.article.url)

			if (!isValidUrl($ctrl.article.url)) {
				return;
			}
			$loader.start();

			$ctrl.call('getUrlMetadata', $ctrl.article.url, function (error, result) {

				if (error) {
					console.error(error);
					return;
				}

				$ctrl.article = $metadata.createArticle($ctrl.article.url, result);
				$ctrl.urlDataIsLoaded = true;

				$scope.$apply(function () {
					$loader.stop();
				});

			});
		}

		function isValidUrl(url) {

			console.log('isValidUrl()');
			console.log(url);

			var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
			return urlregex.test(url);

		}


		$ctrl.ok = function () {

			console.log($ctrl.article)

			switch ($ctrl.mode) {
				case 'add_source_to_topic':
					Meteor.call('addArticle', $ctrl.topicId, $ctrl.modifiedCategory, $ctrl.article);
					break;
				case 'new_topic':
					Meteor.call('addArticle', null, $ctrl.modifiedCategory, $ctrl.article);
					break;
				case 'edit':
					console.log('edit');
					Meteor.call('addArticleToCategory', $ctrl.topicId, $ctrl.modifiedCategory, $ctrl.article);
					Meteor.call('removeArticleFromCategory', $ctrl.topicId, $ctrl.category.category, $ctrl.article._id);
					break;
			}
			$mdDialog.hide();

		};

		$ctrl.searchTextChange = function (text) {
			console.log('Text changed to ' + text);
			$ctrl.modifiedCategory = text;
		}

		$ctrl.selectedItemChange = function (item) {
			console.log('Item changed to ' + JSON.stringify(item));
			if (item) {
				$ctrl.searchTextChange(item.display);
			}
		}

		$ctrl.clearFieldAtFirstFocusOnly = function () {

			if ($ctrl.initialCategory == $ctrl.searchText) {
				$ctrl.searchText = '';
			}

		}


		$ctrl.cancel = function () {
			console.log('mdDialog $ctrl.cancel()')
			$mdDialog.hide();
		}


		$ctrl.showRemovalConfirmation = function (ev) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm({
				onComplete: function afterShowAnimation() {
					var $dialog = angular.element(document.querySelector('md-dialog'));
					var $actionsSection = $dialog.find('md-dialog-actions');
					var $cancelButton = $actionsSection.children()[0];
					var $confirmButton = $actionsSection.children()[1];
					angular.element($confirmButton).addClass('md-raised');
					angular.element($cancelButton).addClass('md-raised').removeClass('md-primary');
				}
			})
				.title('Weet je het zeker?')
				.textContent('Dit artikel zal definitief worden verwijderd.')
				.ariaLabel('Verwijderen')
				.targetEvent(ev)
				.ok('Verwijderen')
				.cancel('Annuleren');

			$mdDialog.show(confirm).then(function () {
				$ctrl.remove($ctrl.topicId, $ctrl.category.category, $ctrl.article);
			}, function () {
				// do nothing.
				console.log('canceled article removal');
			});
		};


		$ctrl.remove = function (topicId, categoryName, article) {
			console.log('removeArticle'); console.log(article._id); console.log(topicId);
			Meteor.call('removeArticleFromCategory', topicId, categoryName, article._id)
			$mdDialog.hide();
		}



		$ctrl.loadAll = function () {
			var map = ('Algemene berichtgeving, Andere kijk, Entertainment').split(/, +/g).map(function (state) {
				return {
					value: state.toLowerCase(),
					display: state
				};
			});
			// console.log(map)
			return map;
		}

		$ctrl.categories = $ctrl.loadAll();

		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);

			return function filterFn(state) {
				return (state.value.indexOf(lowercaseQuery) === 0);
			};

		}


		$ctrl.querySearch = function (query) {

			console.log('query: ' + query);
			console.log($ctrl.categories);

			var results = query ? $ctrl.categories.filter(createFilterFor(query)) : $ctrl.categories,
				deferred;

			console.log(results);

			return results;

		}

	}

}