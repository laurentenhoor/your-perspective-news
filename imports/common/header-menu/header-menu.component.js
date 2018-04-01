
import HeaderMenuTemplate from './header-menu.html';
import HeaderMenuStyle from './header-menu.styl';

class HeaderMenuComponent {

    constructor($scope, $reactive, $shareDialog, $firstUseDialog, $firstUseToast, $joinDialog, $writeOpinionDialog) {
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

        $ctrl.share = ($event) => {
            console.log('share')
            $shareDialog.show($event);
        }

        $ctrl.setupAlerts = ($event) => {
            console.log('setup alerts')
        }

        $ctrl.clickMission = ($event) => {
            $firstUseDialog.show($event);
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Open about',
                eventLabel: 'Via Banner'
            })
        }

        $ctrl.clickJoin = ($event) => {
            $joinDialog.show($event);
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Open "Word verrijker"',
            })
        }

        // $ctrl.clickJoin();

        $ctrl.clickTips = ($event) => {
            $writeOpinionDialog.show($event)
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Open "Verrijkingsverzoek"'
            })
        }
       
    }

}

export default {
    templateUrl: HeaderMenuTemplate,
    controller: HeaderMenuComponent,
    bindings : {}
}