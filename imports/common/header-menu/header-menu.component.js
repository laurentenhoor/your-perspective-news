
import HeaderMenuTemplate from './header-menu.html';
import HeaderMenuStyle from './header-menu.styl';

class HeaderMenuComponent {

    constructor($scope, $reactive, $shareDialog, $mdDialog, $firstUseDialog, $firstUseToast, $joinDialog, $writeOpinionDialog) {
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
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('Blijf up-to-date!')
                .textContent('Ontvang automatisch een email wanneer er een nieuw verrassingspakket beschikbaar is.')
                .placeholder('E-mailadres')
                .ariaLabel('E-mailadres')
                .initialValue('')
                .targetEvent($event)
                .required(true)
                .ok('Houd mij op de hoogte')
                .cancel('Annuleren');

            $mdDialog.show(confirm).then(function (result) {
                $scope.status = 'You decided to name your dog ' + result + '.';
            }, function () {
                $scope.status = 'You didn\'t name your dog.';
            });
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
    bindings: {}
}