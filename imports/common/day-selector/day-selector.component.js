import DaySelectorTemplate from './day-selector.html';
import DaySelectorStyle from './day-selector.styl';

class DaySelectorComponent {

    constructor($scope, $reactive, $daySelector) {
        'ngInject';

        var $ctrl = this;

        $ctrl.selectedDate = $daySelector.selectedDate;
        $ctrl.daySelector = $daySelector;

        $ctrl.tomorrow = () => {
            $daySelector.tomorrow();
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