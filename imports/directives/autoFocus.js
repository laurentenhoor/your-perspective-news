import angular from 'angular';
import angularMeteor from 'angular-meteor';

var name = "autoFocus";

export default angular.module(name, [
	angularMeteor
	]).directive(name, [
		'$document', '$timeout', function($document, $timeout) {

			return function(scope, element, attrs) {

//				blurAllInputs($document);
				
				$timeout(function() {
					$timeout(function() {
						element[0].focus();
					});
				});

			}
		}
		]);


function blurAllInputs($document) {

	console.log('blurAllInputs()');
	
	var inputs = $document[0].querySelectorAll('input');
	
	inputs.forEach(function(input) {
		input.blur();
	});

}