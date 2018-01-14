import angular from 'angular';
import angularMeteor from 'angular-meteor';

import appTemplate from './app.html';
import appStyle from './app.styl';
import { fail } from 'assert';

class AppComponent {
	
	constructor($timeout, $loader, $firstUseToast, $firstUseDialog, $shareDialog) {
		'ngInject';
		
		console.log('init AppCtrl');

		$loader.executeAfterDatabaseInit(() => {
			$timeout(() => {
				if (!$firstUseDialog.isCurrentlyShown())
					$firstUseToast.show();
			}, 6000)
		});

		$shareDialog.show(null, 'sss')

	}
}


export default {
	controller: AppComponent,
	templateUrl : appTemplate
  };