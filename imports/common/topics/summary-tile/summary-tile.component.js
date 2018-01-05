import SummaryTileTemplate from './summary-tile.html';
import SummaryTileStyle from './summary-tile.styl';

_ = lodash;

class SummaryTileComponent {

    constructor($reactive, $scope, $articlesApi, $opinionsApi, $commentsApi, $timeout) {
        'ngInject';
        var $ctrl = this;
        $reactive($ctrl).attach($scope);
        
        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                
                $ctrl.topic = angular.copy($ctrl.topic)
                $ctrl.articles = $articlesApi.getAllByTopic($ctrl.topic)

                $ctrl.helpers({
                    bestArticle : () => {
                        return _.maxBy(
                            $articlesApi.getAllByTopic($ctrl.topic),
                            'score'
                        );
                    },
                    categories : () => {
                        let categories = $ctrl.getReactively('topic')
                        console.log('categories', categories.articlesByCategory);
                        return categories.articlesByCategory
                    },
                    bestOpinion : () => {
                        let bestOpinion = _.maxBy(
                            $opinionsApi.getAllByTopic($ctrl.topic), 
                            'score'
                        );
                        console.log('bestOpinion', bestOpinion);
                        return bestOpinion;
                    },
                    bestQuestion : () => {
                        let bestQuestion = $commentsApi.getBestCommentByTopic($ctrl.topic);
                        console.log('bestQuestion', bestQuestion);
                        return bestQuestion;
                    }
                });

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