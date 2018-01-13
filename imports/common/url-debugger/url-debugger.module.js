import angular from 'angular';

import UrlDebuggerComponent from './url-debugger.component';

export default angular
    .module('UrlDebugger', []) 
    .component('urlDebugger', UrlDebuggerComponent)
    .config(($stateProvider) => {
		'ngInject';

		$stateProvider
			.state('debug', {
				url: "/debug",
				component: 'urlDebugger',
				// data: {
				// 	'meta': {
				// 	  'og:title' : 'Testering yourpers open graph',
				// 	  'og:image': 'http://www.yourdomain.com/img/facebookimage.jpg',
				// 	  'author': 'PawSquad'
				// 	}
				//   }
			});

	})
	.name;