import SummaryTileTemplate from './summary-tile.html';
import SummaryTileStyle from './summary-tile.styl';

class SummaryTileComponent {

    constructor($reactive, $scope, $articlesApi, $topicsApi, $opinionsApi, $commentsApi, $timeout, $autoScroll, $auth, $writeOpinionDialog) {
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

        $ctrl.writeOpinion = function ($event) {
            if ($auth.isLoggedIn()) {
                $writeOpinionDialog.show($event, $ctrl.topic._id);
            }
        }

        $ctrl.scrollToOpinion = function(topicId) {
            openTopic();
            $timeout(()=>{
                $autoScroll.horizontalScroll('opinion-' + topicId, 'scroll-' + topicId);
            },400)
        }


        $ctrl.scrollToArticle = function (articleId, topicId, $event) {
            openTopic();            
            $timeout(()=>{
                $autoScroll.horizontalScroll('topic-' +topicId + '-article-' + articleId, 'scroll-' + topicId);
            },400)
            
        }

        $ctrl.scrollToQuestions = function (topicId) {
            openTopic();
            $timeout(()=>{
                $autoScroll.horizontalScroll('discuss-' + topicId, 'scroll-' + topicId);
            },400)
        }

        function openTopic() {
            $topicsApi.countOpen($ctrl.topic._id);
            $ctrl.detailsAreShown = true;
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