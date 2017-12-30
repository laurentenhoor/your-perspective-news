import AccountMenuTemplate from './account-menu.html';
import AccountMenuStyle from './account-menu.styl';

import { Meteor } from 'meteor/meteor';

class AccountMenuComponent {

    constructor($reactive, $scope, $accountMenu, $auth, $timeout, $filter) {
        'ngInject';

        var $ctrl = this;
		$reactive($ctrl).attach($scope);

		$ctrl.helpers({
			user() {
                console.log(Meteor.user())
                return Meteor.user();
            }
        });
        
        $ctrl.beltImage = '/assets/karateband-wit.jpeg';
        $ctrl.showAllBelts = function() {
            console.log('all belts')
            $ctrl.beltImage = '/assets/karatebanden.jpeg'
        }
        $ctrl.resetBelt= function() {
            console.log('only white belt')
            $ctrl.beltImage = '/assets/karateband-wit.jpeg';
        }

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