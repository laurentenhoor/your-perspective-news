import DaySelectorTemplate from './day-selector.html';
import DaySelectorStyle from './day-selector.styl';

class DaySelectorComponent {

    constructor($scope, $reactive, $daySelector, $dialog) {
        'ngInject';

        var $ctrl = this;

        $ctrl.selectedDate = $daySelector.selectedDate;
        $ctrl.daySelector = $daySelector;

        $ctrl.tomorrow = () => {
            $daySelector.tomorrow();
        }

        $ctrl.alertTomorrow = () => {
            $dialog.show(
                $dialog.alert()
                    .title('Vanaf 15:00 het verrijkte nieuws van de dag.')
                    .textContent('Verrijkt nieuws van hoge kwaliteit kost wat meer tijd.')
                    .ariaLabel('Verse berichten')
                    .ok('Sluiten')
            );
        }

        $ctrl.yesterday = () => {
            $daySelector.yesterday();
        }

    }

}

export default {
    templateUrl: DaySelectorTemplate,
    controller: DaySelectorComponent,
    bindings: {

    }
}