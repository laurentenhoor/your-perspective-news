import DaySelectorTemplate from './day-selector.html';
import DaySelectorStyle from './day-selector.styl';

class DaySelectorComponent {

    constructor($scope, $reactive, $daySelector, $dialog) {
        'ngInject';

        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.daySelector = $daySelector;

        $ctrl.tomorrow = () => {
            $daySelector.tomorrow();
            ga('send', {
                hitType: 'event',
                eventCategory: 'Read',
                eventAction: 'Load tomorrow (undo yesterday)',
            })
        }

        $ctrl.today = new Date();

        $ctrl.alertTomorrow = () => {
            if (!$daySelector.isBeforePublishTime()) {
                return;
            }
            $dialog.show(
                $dialog.alert()
                    .title('Vanaf 15:00 het verrijkte nieuws van de dag.')
                    .textContent('Verrijkt nieuws van hoge kwaliteit kost wat meer tijd.')
                    .ariaLabel('Verse berichten')
                    .ok('Sluiten')
            );
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Open 15:00 alert',
            })
        }

        $ctrl.yesterday = () => {
            $daySelector.yesterday();
            ga('send', {
                hitType: 'event',
                eventCategory: 'Read',
                eventAction: 'Load yesterday',
            })
        }

    }

}

export default {
    templateUrl: DaySelectorTemplate,
    controller: DaySelectorComponent,
    bindings: {

    }
}