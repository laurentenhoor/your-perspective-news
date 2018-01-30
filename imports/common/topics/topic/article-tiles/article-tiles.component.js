import ArticleTilesTemplate from './article-tiles.html';
import ArticleTilesStyle from './article-tiles.styl';

class ArticleTilesComponent {

    constructor($scope, $reactive, $timeout, $topicsApi, $articlesApi) {
        'ngInject';

        let $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic);
                // $ctrl.articles = $articlesApi.getByTopicId($ctrl.topic._id);
                setArticles($ctrl.topic)
            }
        }

        const setArticles = (topic) => {
            $ctrl.rootArticles = $articlesApi.getRootArticles(topic)
            $ctrl.otherArticles = $articlesApi.getOtherArticles(topic)

            if ($ctrl.rootArticles.length > 0) {
                $ctrl.articles = _.concat(_.slice($ctrl.rootArticles,0,2), $ctrl.otherArticles);
            } else {
                $ctrl.articles = $ctrl.otherArticles;
            }
        }

        $topicsApi.setCallbacks({
            addedArticle: (articleId) => {
                console.log("articleAdded", articleId)
                if ($ctrl.topic) {
                    $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                    Meteor.subscribe('articles', [$ctrl.topic], {
                        onReady: () => {
                            setArticles($ctrl.topic)
                        }
                    })
                }
            },
            removedArticle: () => {
                console.log('REMOVED ARTICLE', $ctrl.topic)
                $ctrl.topic = $topicsApi.getById($ctrl.topic._id);
                if($ctrl.topic){
                    setArticles($ctrl.topic)
                }
            }
        })


        $ctrl.showDetails = (detailsAreVisible, articleId) => {
            if (detailsAreVisible){
                $articlesApi.countShowDetails(articleId);
            }
        }

        $ctrl.openExternalUrl = function (article) {

            $ctrl.visitedId = article._id; // trigger animation of click
            $timeout(() => $ctrl.visitedId = null, 700); // should be > animation time

            $articlesApi.countVisitExternal(article._id)

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
        topic: '<'
    }
}