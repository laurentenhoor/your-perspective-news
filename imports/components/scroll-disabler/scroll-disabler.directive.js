export default class ScrollDisablerDirective {

	constructor($scrollDisabler) {
		'ngInject';

		this.restrict = 'A';
		this.link = function ($scope, $element, $attrs) {

			$scope.$watch(() => {

				return $scrollDisabler.isScrollingDisabled()

			}, (scrollingDisabled) => {

				if (scrollingDisabled) {

					$element.addClass('scrolling-disabled')
					console.log('disabled scrolling from directive')

				} else {

					$element.removeClass('scrolling-disabled')
					console.log('enabled scrolling from directive')

				}
				
			});

		}

	}
}