import SummaryTileTemplate from './summary-tile.html';
import SummaryTileStyle from './summary-tile.styl';

class SummaryTileComponent {

    constructor($reactive, $scope, $articlesApi, $opinionsApi, $commentsApi, $timeout, $autoScroll, $auth, $writeOpinionDialog) {
        'ngInject';
        var $ctrl = this;
        $reactive($ctrl).attach($scope);
        
        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic)
                console.log($ctrl.topic)

                $ctrl.helpers({
                    bestArticle : () => {
                        return _.maxBy(
                            $articlesApi.getAllByTopic($ctrl.topic),
                            'score'
                        );
                    },
                    articlesByCategory : () => {
                        let topic = $ctrl.getReactively('topic')
                        _.each(topic.articlesByCategory, (categoryBlock, i) => {
                            topic.articlesByCategory[i].articles = _.orderBy($articlesApi.getByIds(categoryBlock.articleIds), 'score', 'desc');
                        })
                        console.log('categories', topic.articlesByCategory)
                        let length = topic.articlesByCategory[0].articles.length;
                        $ctrl.topicImageUrl = topic.articlesByCategory[0].articles[length-1].imageUrl;
                        return topic.articlesByCategory
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

        $ctrl.gotoCategory = function(index, topicId) {
            $autoScroll.horizontalScroll('category-'+index+'-' + topicId, 'scroll-' + topicId);
        }

        $ctrl.discuss = function(topicId) {
            $autoScroll.horizontalScroll('discuss-' + topicId, 'scroll-' + topicId);
        }

        $ctrl.writeOpinion = function($event) {
            if ($auth.isLoggedIn()) {
                $writeOpinionDialog.show($event, $ctrl.topic._id);
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