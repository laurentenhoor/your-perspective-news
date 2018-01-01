import SelectSourceTemplate from './select-source.html';
import SelectSourceStyle from './select-source.styl';

import { Topics } from '/imports/api/topics.js';
import { Articles } from '/imports/api/articles.js';

class SelectSourceComponent {

    constructor($reactive, $scope) {
        'ngInject';

        $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.$onChanges = function (changes) {
			if (changes.topicId) {
                $ctrl.topicId = angular.copy($ctrl.topicId);
                let topic = Topics.findOne({_id : $ctrl.topicId}, {});
                getArticlesFromTopic(topic);
			}
        }

        function getArticlesFromTopic(topic) {

            let articleIds = [];

            angular.forEach(topic.articlesByCategory, (category) => {
                angular.forEach(category.articleIds, (articleId) => {
                    articleIds.push(articleId);
                })
            })
            
            $ctrl.articles = Articles.find({
                _id: { "$in": articleIds }
            }).fetch()
        }

        $ctrl.clickArticle = function(article) {
            $ctrl.onAddArticleRef({ $event: {
                article: article
              }});
        }

    }
}

export default {
    templateUrl: SelectSourceTemplate,
    controller : SelectSourceComponent,
    bindings : {
        topicId : '<',
        onAddArticleRef : '&',
    }
}