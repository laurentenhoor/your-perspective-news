
import HeaderMenuTemplate from './header-menu.html';
import HeaderMenuStyle from './header-menu.styl';

class HeaderMenuComponent {

    constructor($scope, $reactive, $auth, $rootScope, $location, $window, $firstUseDialog, $firstUseToast, $filter) {
        'ngInject'

        var $ctrl = this;
        $reactive($ctrl).attach($scope);
        
        $ctrl.now = new Date();

        $ctrl.helpers({
            isAdmin : () => {
                return $auth.isAdmin();
            }, 
            user : () => {
                return Meteor.userId();
            }
        }) 

        $ctrl.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $ctrl.window = $window;

        $ctrl.login = () => {
            if (Meteor.user()) {
                $auth.logout();
            } else {
                $auth.login();
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