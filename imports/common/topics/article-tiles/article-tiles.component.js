import ArticleTilesTemplate from './article-tiles.html';
import ArticleTilesStyle from './article-tiles.styl';

class ArticleTilesComponent {

    constructor($scope, $reactive, $timeout, $topicsApi, $articlesApi) {
        'ngInject';

        const $ctrl = this;
        $reactive($ctrl).attach($scope);

        $topicsApi.setCallbacks({
            addedArticle: (articleId) => {
                $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                console.log("articleAdded", articleId)
                Meteor.subscribe('articles', [$ctrl.topic], {
                    onReady: () => {
                        $ctrl.articles = $articlesApi.getByTopic($ctrl.topic)
                    }
                })
            },
            removedArticle: () => {
                $ctrl.articles = $articlesApi.getByTopicId($ctrl.topic._id)
            }
        })

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic);
                $ctrl.articles = $articlesApi.getByTopicId($ctrl.topic._id);
            }
        }

        $ctrl.openExternalUrl = function (article) {

            $ctrl.visitedId = article._id; // trigger animation of click
            $timeout(() => $ctrl.visitedId = null, 700); // should be > animation time

            if (article.url && article.url != '') {
                $timeout(() => window.location.href = article.url, 300);
            }

        }

    }

}

export default {
    templateUrl: ArticleTilesTemplate,
    controller: ArticleTilesComponent,
    bindings: {
        topic: '<',
    }
}