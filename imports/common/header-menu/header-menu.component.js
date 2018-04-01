
import HeaderMenuTemplate from './header-menu.html';
import HeaderMenuStyle from './header-menu.styl';

import SlackAPI from 'node-slack';


class HeaderMenuComponent {

    constructor($scope, $reactive, $shareDialog, $mdDialog, $firstUseDialog, $firstUseToast) {
        'ngInject'

        var $ctrl = this;

        var Slack = new SlackAPI('https://hooks.slack.com/services/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');

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

            $mdDialog.show(confirm).then(function (email) {
                Slack.send({
                    text: 'Ik wil graag dagelijks op de hoogte gehouden worden! Email me op ' + email,
                });
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Account',
                    eventAction: 'New follower',
                    eventLabel: email
                })
            }, function () {
                // dialog canceled
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


    }

}

export default {
    templateUrl: HeaderMenuTemplate,
    controller: HeaderMenuComponent,
    bindings: {}
}