import angular from 'angular';
import angularMeteor from 'angular-meteor';

import appTemplate from './app.html';
import appStyle from './app.styl';

class AppComponent {
	
	constructor($timeout, $loader, $firstUseToast, $firstUseDialog) {
		'ngInject';
		
		console.log('init AppCtrl');

		$loader.executeAfterDatabaseInit(() => {
			$timeout(() => {
				if (!$firstUseDialog.isCurrentlyShown())
					$firstUseToast.show();
			}, 6000)
		});

	}
}


export default {
	controller: AppComponent,
	templateUrl : appTemplate
  };