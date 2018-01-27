import ArticleTilesTemplate from './article-tiles.html';
import ArticleTilesStyle from './article-tiles.styl';

class ArticleTilesComponent {

    constructor($scope, $reactive, $timeout, $articlesApi) {
        'ngInject';
        
        const $ctrl = this;
		$reactive($ctrl).attach($scope);

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic);
            }
        }
        
        $ctrl.helpers({
            articles: () => {
                let topic = $ctrl.getReactively('topic');
                if (topic) {
                    return $articlesApi.getByTopic(topic)
                } 
                return null;
            }
        })

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