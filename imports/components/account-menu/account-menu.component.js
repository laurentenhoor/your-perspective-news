import AccountMenuTemplate from './account-menu.html';
import AccountMenuStyle from './account-menu.styl';

import { Meteor } from 'meteor/meteor';

class AccountMenuComponent {

    constructor($reactive, $scope, $accountMenu, $auth, $timeout) {
        'ngInject';
        
        var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.helpers({
			userName() {
                let user = Meteor.user();
                if (user && user.profile) {
                    let fullName = user.profile.firstName + ' ' + user.profile.lastName;
				    return fullName;
                }
                return;
			},
			userImage() {
                let user = Meteor.user();
                console.log(user);
                if (user && user.profile) {
                    let pictureUrl = user.profile.pictureUrl;
                    console.log(pictureUrl);
                    return pictureUrl;
                }
                return;
			}
		});

        $ctrl.toggleAccountMenu = function() {
            console.log('toggleAccountMenu');
            $accountMenu.toggle();
        }

        $ctrl.logout = function() {
            $ctrl.toggleAccountMenu();
            $auth.logout();
        }

        // $timeout(()=>$ctrl.toggleAccountMenu())

    }
}

export default {
    templateUrl: AccountMenuTemplate,
    controller: AccountMenuComponent
}