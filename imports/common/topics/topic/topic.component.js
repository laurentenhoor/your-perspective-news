import TopicTemplate from './topic.html';
import TopicStyle from './topic.styl';

class TopicComponent {
    constructor($topicsApi, $articlesApi) {
        'ngInject';

        var $ctrl = this;

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic);
                getArticles($ctrl.topic);
            }
            if (changes.openTopicId) {
                $ctrl.openTopicId = angular.copy($ctrl.openTopicId);
                console.log($ctrl.openTopicId);
            }
        }

        const getArticles = (topic) => {
            $ctrl.rootArticles = _.slice($articlesApi.getRootArticles(topic),0,2)
            $ctrl.otherArticles = $articlesApi.getOtherArticles(topic)
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
                if($ctrl.topic){
                    getArticles($ctrl.topic)
                }
            }
        })

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