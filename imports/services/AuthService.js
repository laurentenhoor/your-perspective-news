import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';

import { Meteor } from 'meteor/meteor';

class AuthService {

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
						.title('Je bent niet ingelogd')
						.textContent('Log eenvoudig in met LinkedIn. Een account aanmaken is niet nodig.')
						.ariaLabel('Login met LinkedIn')
						.ok('Login')
						.cancel('Annuleren')
				
				
				 $mdDialog.show(confirmModal).then(function() {
					  Meteor.loginWithLinkedIn({loginStyle:'redirect'});		
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

var name = "AuthService";

export default angular.module(name, [
	angularMeteor,
	angularMaterial,
	]).service(name, ['$mdDialog', AuthService.factory]);