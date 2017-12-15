import angular from 'angular';
import angularMeteor from 'angular-meteor';

var name = "autoFocus";

export default angular.module(name, [
	angularMeteor
	]).directive(name, [
		'$document', '$timeout', function($document, $timeout) {

			return function(scope, element, attrs) {

				blurAllInputs($document);

				console.log(element[0]);
				
				$timeout(function() {
					$timeout(function() {
						element[0].focus();
					});
				});

			}
		}
		]);


function blurAllInputs($document) {

	var inputs = $document[0].querySelectorAll('input');

	inputs.forEach(function(input) {
		input.blur();
	});

}
