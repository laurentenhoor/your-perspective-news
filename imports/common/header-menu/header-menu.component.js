
import HeaderMenuTemplate from './header-menu.html';
import HeaderMenuStyle from './header-menu.styl';

class HeaderMenuComponent {

    constructor($scope, $reactive, $firstUseDialog, $firstUseToast, $joinDialog, $writeOpinionDialog) {
        'ngInject'

        var $ctrl = this;

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

        $ctrl.clickJoin = ($event) => {
            $joinDialog.show($event);
        }

        $ctrl.clickTips = ($event) => {
            $writeOpinionDialog.show($event)
        }
       
    }

}

export default {
    templateUrl: HeaderMenuTemplate,
    controller: HeaderMenuComponent,
    bindings : {}
}