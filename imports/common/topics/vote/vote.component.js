import VoteTemplate from './vote.html';
import VoteStyle from './vote.styl';

import { Articles } from '/imports/api/articles.js';
import { Votes } from '/imports/api/votes.js';

class VoteComponent {

    constructor($reactive, $scope, $vote) {
        'ngInject';

        let $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.$onChanges = (changes) => {
            if (changes.articleId) {
                $ctrl.articleId = angular.copy($ctrl.articleId);
            }
        }

        Meteor.subscribe('topicsAndArticles', {
            onReady: function () {

                $ctrl.helpers({
                    'itemTotalScore': () => {
                        let article = Articles.findOne({
                            _id: $ctrl.getReactively('articleId')
                        });
                        return article ? article.score : 0;

                    },
                    'myVoteValue' : () => {
                        let vote = Votes.findOne({
                            articleId : $ctrl.getReactively('articleId')
                        });
                        return vote ? vote.value : 0;

                    }
                });

            }
        });

        $ctrl.vote = function (voteUpOrDown) {
            $vote.voteById($ctrl.articleId, voteUpOrDown)
        }

    }


}

export default {
    templateUrl: VoteTemplate,
    controller: VoteComponent,
    bindings : {
        articleId: '<'
    }
}