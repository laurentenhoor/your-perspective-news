import ArticleTilesTemplate from './article-tiles.html';
import ArticleTilesStyle from './article-tiles.styl';

class ArticleTilesComponent {

    constructor($scope, $reactive, $timeout, $articlesApi) {
        'ngInject';

        let $ctrl = this;
        $reactive($ctrl).attach($scope);

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
        topic:'<',
        articles: '<'
    }
}