
import HeaderMenuTemplate from './header-menu.html';
import HeaderMenuStyle from './header-menu.styl';

class HeaderMenuComponent {

    constructor($scope, $reactive, $auth, $location, $firstUseDialog, $firstUseToast) {
        'ngInject'

        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.helpers({
            isAdmin : () => {
                return $auth.isAdmin();
            }, 
            isAnonymous : () => {
                if (Meteor.user()) {
                    return Meteor.user().anonymous;
                }
                return true;
            }
        }) 

        $ctrl.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $ctrl.login = () => {
            if ($ctrl.isAnonymous) {
                $auth.login();
            } else {
                $auth.logout();
            }
        }

        $ctrl.clickLogo = function ($event) {
            console.log('logo clicked')
            $firstUseToast.hide();
            $firstUseDialog.show($event);
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Open about',
                eventLabel: 'Via Logo Click'
            })
        }
       
    }

}

export default {
    templateUrl: HeaderMenuTemplate,
    controller: HeaderMenuComponent,
    bindings : {}
}