import TopicTemplate from './topic.html';
import TopicStyle from './topic.styl';

class TopicComponent {
    constructor($topicsApi, $articlesApi) {
        'ngInject';

        var $ctrl = this;
        $ctrl.amountOfRootArticles = 2;
        $ctrl.amountOfOtherArticles = 2;

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic);
                getArticles($ctrl.topic);
            }
        }

        const getArticles = (topic) => {
            $ctrl.allRootArticles = $articlesApi.getRootArticles(topic)
            $ctrl.rootArticles = _.slice($ctrl.allRootArticles, 0, $ctrl.amountOfRootArticles)
            
            $ctrl.allOtherArticles = $articlesApi.getOtherArticles(topic)
            $ctrl.otherArticles = _.slice($ctrl.allOtherArticles, 0, $ctrl.amountOfOtherArticles)
        }

        $topicsApi.setCallbacks({
            addedArticle: (articleId) => {
                console.log("articleAdded", articleId)
                if ($ctrl.topic) {
                    $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                    Meteor.subscribe('articles', [$ctrl.topic], {
                        onReady: () => {
                            getArticles($ctrl.topic)
                        }
                    })
                }
            },
            removedArticle: () => {
                console.log('REMOVED ARTICLE', $ctrl.topic)
                $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                if ($ctrl.topic) {
                    getArticles($ctrl.topic)
                }
            }
        })

    
        $ctrl.moreRootArticlesAvailable = () => {
            return ($ctrl.allRootArticles.length != $ctrl.rootArticles.length)
        }

        $ctrl.showMoreRootArticles = () => {
            $ctrl.amountOfRootArticles++;
            $ctrl.rootArticles = _.slice($ctrl.allRootArticles, 0, $ctrl.amountOfRootArticles)
        }

        $ctrl.moreOtherArticlesAvailable = () => {
            return ($ctrl.allOtherArticles.length != $ctrl.otherArticles.length)
        }

        $ctrl.showMoreOtherArticles = () => {
            $ctrl.amountOfOtherArticles++;
            $ctrl.otherArticles = _.slice($ctrl.allOtherArticles, 0, $ctrl.amountOfOtherArticles)
        }

    }

}

export default {
    templateUrl: TopicTemplate,
    controller: TopicComponent,
    bindings: {
        topic: '<',
        openTopicId: '<',
        onOpenTopic: '&'
    }
}