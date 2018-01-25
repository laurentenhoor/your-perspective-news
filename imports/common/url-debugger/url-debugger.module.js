import angular from 'angular';

import UrlDebuggerComponent from './url-debugger.component';

import Preloader from './preloader'

export default angular
    .module('UrlDebugger', [Preloader]) 
    .component('urlDebugger', UrlDebuggerComponent)
    .config(($stateProvider) => {
		'ngInject';

		$stateProvider
			.state('debug', {
				url: "/debug",
				component: 'urlDebugger',
			});

	})
	.name;