import SummaryTileTemplate from './summary-tile.html';
import SummaryTileStyle from './summary-tile.styl';

class SummaryTileComponent {

    constructor($reactive, $scope) {
        'ngInject';
        $ctrl = this;
        $reactive($ctrl).attach($scope);
      
        $ctrl.$onChanges = (changes) => {
            if (changes.topicId) {

                $ctrl.helpers({
                });

            }
        }

    }

}

export default {
    templateUrl: SummaryTileTemplate,
    controller: SummaryTileComponent,
    bindings: {
        topicId: '<',
    }
}