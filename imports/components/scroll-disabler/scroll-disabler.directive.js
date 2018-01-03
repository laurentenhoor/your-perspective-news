export default class ScrollDisablerDirective {

	constructor($scrollDisabler) {
		'ngInject';

		this.restrict = 'A';
		this.link = function ($scope, $element, $attrs) {

			$scope.$watch(() => $scrollDisabler.isScrollingDisabled(),
				(scrollingDisabled) => {

					if (scrollingDisabled) {
						$element.addClass('scrolling-disabled');
					} else {
						$element.removeClass('scrolling-disabled');
					}

				});

		}

	}
}