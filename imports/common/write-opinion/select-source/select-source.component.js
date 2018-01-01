import SelectSourceTemplate from './select-source.html';
import SelectSourceStyle from './select-source.styl';

import { Topics } from '/imports/api/topics.js';
import { Articles } from '/imports/api/articles.js';

class SelectSourceComponent {

    constructor() {
        'ngInject';

        $ctrl = this;

        $ctrl.clickArticle = function(article) {
            $ctrl.onArticleRefClick({ $event: {
                article: article
              }});
        }

    }
}

export default {
    templateUrl: SelectSourceTemplate,
    controller : SelectSourceComponent,
    bindings : {
        articles : '<',
        onArticleRefClick : '&',
    }
}