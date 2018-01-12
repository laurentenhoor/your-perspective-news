import OpinionTileTemplate from './opinion-tile.html';
import OpinionTileStyle from './opinion-tile.styl';

class OpinionTileComponent {

    constructor($reactive, $scope, $opinionsApi, $usersApi, $writeOpinionDialog) {
        'ngInject';
        var $ctrl = this;
        $reactive($ctrl).attach($scope);
      
        $ctrl.$onChanges = (changes) => {
            if (changes.topicId) {
                $ctrl.topicId = angular.copy($ctrl.topicId);
            }
        }

        $ctrl.helpers({
            opinions : () => {
                return $opinionsApi.getAllByTopicId($ctrl.getReactively('topicId'));;
            },
            userOpinion : () => {
                var userOpinion = $opinionsApi.getUserOpinion($ctrl.getReactively('topicId'))
                console.log(userOpinion);
                return userOpinion;
            }
        });

        $ctrl.getUsername = function(userId) {
            return $usersApi.getUsername(userId);
        }

        $ctrl.editOpinion = function($event) {
            $writeOpinionDialog.show($event, $ctrl.topicId)
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