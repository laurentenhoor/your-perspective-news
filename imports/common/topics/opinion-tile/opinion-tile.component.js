import OpinionTileTemplate from './opinion-tile.html';
import OpinionTileStyle from './opinion-tile.styl';

class OpinionTileComponent {

    constructor($reactive, $scope, $opinionsApi) {
        'ngInject';
        $ctrl = this;
        // $reactive($ctrl).attach($scope);

        // $ctrl.helpers({
        //     'opinions' : function() {
        //         let topicId = $ctrl.getReactively('topicId');
        //         console.log(topicId);
        //         return $opinionsApi.getByTopicId(topicId);
        //     }
        // })

        // $ctrl.$onChanges = (changes) => {
        //     if (changes.topicId) {
        //         // $ctrl.topicId = angular.copy($ctrl.topicId);
        //     }
            
        // }

    }

}

export default {
    templateUrl: OpinionTileTemplate,
    controller: OpinionTileComponent,
    bindings: {
        topicId: '<'
    }
}