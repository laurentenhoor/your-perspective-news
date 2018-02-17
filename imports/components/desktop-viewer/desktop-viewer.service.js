import angular from 'angular';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

export default class DesktopViewerService {

	constructor() {
		'ngInject';

        return {
            isDesktop: () => {
				if (window.frameElement && window.frameElement.id && window.frameElement.id == "desktop-viewer-iframe") {
					return true
				}
				return false;
 			}
        }
	}
}