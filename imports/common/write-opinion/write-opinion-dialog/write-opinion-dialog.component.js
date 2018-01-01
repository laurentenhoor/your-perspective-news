import { Meteor } from 'meteor/meteor';
import { Opinions } from '/imports/api/opinions.js';

export default class WriteOpinionDialogComponent {

    constructor(topicId, $writeOpinionDialog, $metadata, $articlesApi) {
        'ngInject';

        console.log('init WriteOpinionDialog')
        var $ctrl = this;

        $ctrl.topicId = topicId;
        $ctrl.articles = $articlesApi.getAllByTopicId($ctrl.topicId);
        console.log($ctrl.articles)

        var opinion = Opinions.findOne({ topicId: $ctrl.topicId }, {});

        if (opinion) {
            $ctrl.document = opinion;
            $ctrl.document.new = false
        } else {
            $ctrl.document = {
                title: '',
                content: '',
                imageUrl: '',
                refs: [],
                topicId: topicId,
                ownerId: Meteor.userId(),
                draft: true,
                new: true,
            }
        }
        $ctrl.initContent = angular.copy($ctrl.document.content);

        $ctrl.receiveHtml = function($event) {
            $ctrl.document.content = $event.htmlContent;
        }

        $ctrl.hideDialog = function () {
            $writeOpinionDialog.hide();
        }


        $ctrl.saveDocument = function () {
            console.log($ctrl.document)
            Opinions.upsert({ _id: $ctrl.document._id }, $ctrl.document, (error, result) => {
                if (error)
                    return console.error(error);
                console.log(result);
            });
            $ctrl.hideDialog();
        }

        $ctrl.publishDocument = function () {
            $ctrl.document.draft = false
            $ctrl.saveDocument();
        }

        $ctrl.urlChange = function () {
            $metadata.getArticleFromUrl($ctrl.article.url, (error, article) => {
                if (error)
                    return console.error(error);
                $ctrl.articles.unshift(article)
            });
           
        }

        $ctrl.addArticleRef = function($event) {
            $ctrl.addArticle = angular.copy($event.article);
        }

    }

}