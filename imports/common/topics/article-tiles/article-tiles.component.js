import ArticleTilesTemplate from './article-tiles.html';
import ArticleTilesStyle from './article-tiles.styl';

class ArticleTilesComponent {

    constructor($timeout, $articlesApi) {
        'ngInject';
        
        let $ctrl = this;

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic);
                $ctrl.articles = $articlesApi.getByTopic($ctrl.topic);
            }
        }

        $ctrl.getArticlesByIds = function (ids) {
            return $articlesApi.getByIds(ids);
        }

        $ctrl.getArticleWithHighestScore = function (articles) {
            return _.last(_.sortBy(articles, 'score'));
        };

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