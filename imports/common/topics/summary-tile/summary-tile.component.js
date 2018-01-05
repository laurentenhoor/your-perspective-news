import SummaryTileTemplate from './summary-tile.html';
import SummaryTileStyle from './summary-tile.styl';

class SummaryTileComponent {

    constructor($reactive, $scope, $articlesApi, $timeout) {
        'ngInject';
        var $ctrl = this;
        $reactive($ctrl).attach($scope);
        
        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                
                $ctrl.topic = angular.copy($ctrl.topic)
                $ctrl.articles = $articlesApi.getAllByTopic($ctrl.topic)

                console.log($ctrl.topic)
                console.log($ctrl.articles);

                $ctrl.topic.title = "Titel van dit topic!"

            }
        }

    }

}

export default {
    templateUrl: SummaryTileTemplate,
    controller: SummaryTileComponent,
    bindings: {
        topic: '<',
    }
}