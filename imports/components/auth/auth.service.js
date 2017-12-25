import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';

import { Meteor } from 'meteor/meteor';

export default class AuthService {

	constructor($mdDialog) {

		return {
			isLoggedIn: isLoggedIn
		}

		function isLoggedIn() {

			if (!Meteor.userId()) {
				
				 var confirmModal = $mdDialog.confirm({
		                onComplete: function afterShowAnimation() {
		                    var $dialog = angular.element(document.querySelector('md-dialog'));
		                    var $actionsSection = $dialog.find('md-dialog-actions');
		                    var $cancelButton = $actionsSection.children()[0];
		                    var $confirmButton = $actionsSection.children()[1];
		                    angular.element($confirmButton).addClass('md-raised');
		                    angular.element($cancelButton).addClass('md-raised').removeClass('md-primary');
	                	}
			    	})
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.title('Log in met LinkedIn')
						.textContent(`Wij streven naar eerlijke discussies tussen echte mensen.`)
						.ariaLabel('Log in met LinkedIn')
						.ok('Login')
						.cancel('Annuleren')
				
				
				 $mdDialog.show(confirmModal).then(function() {
					 	Meteor.loginWithLinkedIn();		
					 return;
				    }, function() {
				    	console.log('canceled login modal');
				    });
				 
				return false;
			} else {
				return true;
			}		

		}
	}

	static factory($mdDialog){
		return new AuthService($mdDialog);
	}

}
