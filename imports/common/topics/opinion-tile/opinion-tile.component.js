import OpinionTileTemplate from './opinion-tile.html';
import OpinionTileStyle from './opinion-tile.styl';

class OpinionTileComponent {

    constructor($reactive, $scope, $opinionsApi, $usersApi) {
        'ngInject';
        $ctrl = this;
        $reactive($ctrl).attach($scope);
      
        $ctrl.$onChanges = (changes) => {
            if (changes.topicId) {

                $ctrl.helpers({
                    'opinions' : function() {
                        var opinions = $opinionsApi.getAllByTopicId($ctrl.topicId);
                        return opinions;
                    }
                });

            }
        }

        $ctrl.getUsername = function(userId) {
            return $usersApi.getUsername(userId);
        }

    }

}

export default {
    templateUrl: OpinionTileTemplate,
    controller: OpinionTileComponent,
    bindings: {
        topicId: '<',
    }
}