export default class ScrollDisablerDirective {

	constructor($scrollDisabler) {
		'ngInject';

		this.restrict = 'A';
		this.link = function ($scope, $element, $attrs) {

			$scope.$watch(() => $scrollDisabler.isScrollingDisabled(),
				(scrollingDisabled) => {

					if (scrollingDisabled) {
						$element.css('overflow', 'hidden');
					} else {
						$element.css('overflow', '');
					}

				});

		}

	}
}