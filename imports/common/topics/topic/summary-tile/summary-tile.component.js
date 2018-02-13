import SummaryTileTemplate from './summary-tile.html';
import SummaryTileStyle from './summary-tile.styl';

class SummaryTileComponent {

    constructor($reactive, $scope, $articlesApi, $topicsApi, $opinionsApi, $commentsApi, $questionsApi, $timeout, $auth, $writeOpinionDialog, smoothScroll) {
        'ngInject';
        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.showSummary = true;
        $ctrl.defaultImageUrl = '/logos/closeup-01.svg';

        $ctrl.$onChanges = (changes) => {
            if (changes.topic && $ctrl.topic) {
                $ctrl.topic = angular.copy($ctrl.topic)
                divideArticles();
            }
        }

        $topicsApi.setCallbacks({
            addedArticle: (articleId) => {
                if ($ctrl.topic) {
                    $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                    Meteor.subscribe('articles', [$ctrl.topic], {
                        onReady: () => {
                            divideArticles();
                        }
                    })
                }
            },
            removedArticle: () => {
                if ($ctrl.topic) {
                    $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                    divideArticles();
                }

            }
        })


        $ctrl.helpers({
            amountOfQuestions: () => {
                let questions = $questionsApi.getAllByTopic($ctrl.getReactively('topic'));
                if (questions) {
                    return questions.length;
                }
                return null;
            },
            amountOfOpinions: () => {
                let opinions = $opinionsApi.getAllByTopic($ctrl.getReactively('topic'));
                if (opinions) {
                    return opinions.length;
                }
                return null;
            }
        });

        const divideArticles = () => {

            $ctrl.articles = $articlesApi.getByTopic($ctrl.topic);

            let rootArticles = $articlesApi.getRootArticles($ctrl.topic)
            let otherArticles = $articlesApi.getOtherArticles($ctrl.topic)

            if (rootArticles.length > 0) {
                $ctrl.mainArticle = rootArticles[0];
                $ctrl.otherArticle = otherArticles[0];
            } else {
                $ctrl.mainArticle = otherArticles[0];
                $ctrl.otherArticle = otherArticles[1];
            }
        }

        $ctrl.thisTopicIsOpen = () => {
            return ($ctrl.topic && $ctrl.topic._id == $ctrl.openTopicId)
        }

        const openTopic = () => {
            $topicsApi.countOpen($ctrl.topic._id);
            $ctrl.onOpenTopic({ $event: { openTopicId: $ctrl.topic._id } });
        }

        $ctrl.writeOpinion = function ($event) {
            if ($auth.isLoggedIn()) {
                $writeOpinionDialog.show($event, $ctrl.topic._id);
            }
        }

        $ctrl.scrollToOpinion = function (topicId) {
            openTopic();
            smoothScroll(targetId='opinion-' + topicId, {
                containerId :  'scroll-' + topicId,
                direction : 'horizontal',
            });
        }


        $ctrl.scrollToArticle = function (articleId, topicId, $event) {
            openTopic();
            smoothScroll(targetId='topic-' + topicId + '-article-' + articleId, {
                containerId :  'scroll-' + topicId,
                direction : 'horizontal',
            });
        }

        $ctrl.scrollToQuestions = function (topicId) {
            openTopic();
            smoothScroll(targetId='debate-' + topicId, {
                containerId :  'scroll-' + topicId,
                direction : 'horizontal',
            });
        }


    }

}

export default {
    templateUrl: SummaryTileTemplate,
    controller: SummaryTileComponent,
    bindings: {
        topic: '<',
        onOpenTopic: '&',
        openTopicId: '<',
    }
}