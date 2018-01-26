import VoteTemplate from './vote.html';
import VoteStyle from './vote.styl';

import { Votes } from '/imports/api/votes.js';

class VoteComponent {

    constructor($reactive, $scope, $votesApi, $votableItemsApi) {
        'ngInject';

        let $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.$onChanges = (changes) => {
            if (changes.articleId) {
                $ctrl.articleId = angular.copy($ctrl.articleId);              
            }
        }

        $ctrl.helpers({
            myVoteValue: () => {
                var vote = Votes.findOne({
                    articleId: $ctrl.getReactively('articleId')
                });
                return vote ? vote.value : 0;
            },
            itemTotalScore: () => {
                return $votableItemsApi.getVotableItemScore($ctrl.getReactively('articleId'))
            }
        });

        $ctrl.vote = function (voteUpOrDown) {
            console.log('vote ', voteUpOrDown)
            $votesApi.voteById($ctrl.articleId, voteUpOrDown)
        }

    }

}

export default {
    templateUrl: VoteTemplate,
    controller: VoteComponent,
    bindings: {
        articleId: '<'
    }
}