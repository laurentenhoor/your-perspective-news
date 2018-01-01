export default class ScrollDisablerDirective {

	constructor($scrollDisabler) {
		'ngInject';

		this.restrict = 'A';
		this.link = function($scope, $element, $attrs) {

			if ($scrollDisabler.isScrollingDisabled()) {
				console.log('disable scrolling')
			} else {
				console.log('enable scrolling')
			}
      
		}

	}
}

