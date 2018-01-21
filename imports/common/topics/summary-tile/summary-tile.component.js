import SummaryTileTemplate from './summary-tile.html';
import SummaryTileStyle from './summary-tile.styl';

class SummaryTileComponent {

    constructor($reactive, $scope, $articlesApi, $opinionsApi, $commentsApi, $timeout, $autoScroll, $auth, $writeOpinionDialog, $dialog) {
        'ngInject';
        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.showSummary = true;

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                
                $ctrl.topic = angular.copy($ctrl.topic)
                $ctrl.articles = $articlesApi.getByTopic($ctrl.topic);

                if ($ctrl.articles.length > 0) {
                    $ctrl.articles = _.orderBy($ctrl.articles, 'createdAt', 'asc');
                    $ctrl.topicImageUrl = $ctrl.articles[0].imageUrl;
                    $ctrl.mainArticle = $ctrl.articles[0];
                    $ctrl.otherArticle = $ctrl.articles[1];
                }
                

                $ctrl.helpers({
                    bestOpinion: () => {
                        var opinions = $opinionsApi.getAllByTopic($ctrl.topic);
                        var bestOpinion = _.maxBy(opinions,'score');
                        // console.log('bestOpinion', bestOpinion)
                        return bestOpinion;
                    },
                    bestQuestion: () => {
                        let bestQuestion = $commentsApi.getBestCommentByTopic($ctrl.topic);
                        // console.log('bestQuestion', bestQuestion);
                        return bestQuestion;
                    },
                    amountOfQuestions : () => {
                        let questions = $commentsApi.getAllByTopic($ctrl.topic);
                        return questions.length;
                    },
                    amountOfOpinions : () => {
                        let opinions = $opinionsApi.getAllByTopic($ctrl.topic);
                        return opinions.length;
                    }
                });

            }
            if (changes.showDetails) {
                $ctrl.detailsAreShown = angular.copy($ctrl.showDetails)
            }
        }

        $ctrl.gotoCategory = function (articleId, topicId, $event) {
            console.log('scrollToCategory:', articleId, topicId);
            // console.log($ctrl.topic.articlesByCategory)
            
            $ctrl.detailsAreShown = true;
            $ctrl.onShowDetails({$event: {showDetails: $ctrl.detailsAreShown}});

            $timeout(()=>{
                $autoScroll.horizontalScroll('topic-' +topicId + '-article-' + articleId, 'scroll-' + topicId);
            },400)
            
        }

        $ctrl.discuss = function (topicId) {
            $ctrl.detailsAreShown = true;
            $ctrl.onShowDetails({$event: {showDetails: $ctrl.detailsAreShown}});

            $timeout(()=>{
                $autoScroll.horizontalScroll('discuss-' + topicId, 'scroll-' + topicId);
            },400)
           
        }

        $ctrl.writeOpinion = function ($event) {
            if ($auth.isLoggedIn()) {
                $writeOpinionDialog.show($event, $ctrl.topic._id);
            }
        }

        $ctrl.readOpinion = function(topicId) {
            $ctrl.detailsAreShown = true;
            $ctrl.onShowDetails({$event: {showDetails: $ctrl.detailsAreShown}});

            $timeout(()=>{
                $autoScroll.horizontalScroll('opinion-' + topicId, 'scroll-' + topicId);
            },400)
        }

        $ctrl.makeDetailsVisible = function() {
            console.log('showDetails')
            if ($ctrl.detailsAreShown) {
                $ctrl.detailsAreShown = false;
            } else {
                $ctrl.detailsAreShown = true;
            }
            
            $ctrl.onShowDetails({$event: {showDetails: $ctrl.detailsAreShown}});
        }

    }

}

export default {
    templateUrl: SummaryTileTemplate,
    controller: SummaryTileComponent,
    bindings: {
        topic: '<',
        showDetails: '<',
        onShowDetails: '&',
    }
}