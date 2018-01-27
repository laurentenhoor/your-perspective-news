import CategoryTilesTemplate from './category-tiles.html';
import CategoryTilesStyle from './category-tiles.styl';

class CategoryTilesComponent {

    constructor($timeout, $articlesApi) {
        'ngInject';
        
        let $ctrl = this;

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
    templateUrl: CategoryTilesTemplate,
    controller: CategoryTilesComponent,
    bindings: {
        topic: '<',
    }
}