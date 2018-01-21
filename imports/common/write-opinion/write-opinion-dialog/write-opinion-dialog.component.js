import { Meteor } from 'meteor/meteor';
import { Opinions } from '/imports/api/opinions.js';

export default class WriteOpinionDialogComponent {

    constructor(topicId, $writeOpinionDialog, $metadata, $articlesApi, $element) {
        'ngInject';

        console.log('init WriteOpinionDialog')
        var $ctrl = this;

        $ctrl.topicId = topicId;
        $ctrl.articles = $articlesApi.getByTopicId($ctrl.topicId);
        console.log($ctrl.articles)

        var opinion = Opinions.findOne({ ownerId: Meteor.userId(), topicId: $ctrl.topicId }, {});

        if (opinion) {
            $ctrl.document = opinion;
            $ctrl.document.new = false;
            $ctrl.document.updatedAt = Date.now();
            $ctrl.document.ownerId = Meteor.userId();
        } else {
            $ctrl.document = {
                title: '',
                content: '',
                imageUrl: '',
                refs: [],
                score : 0,
                topicId: topicId,
                ownerId: Meteor.userId(),
                draft: true,
                new: true,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
        }
        $ctrl.initContent = angular.copy($ctrl.document.content);

        $ctrl.receiveHtml = function($event) {
            $ctrl.document.content = $event.htmlContent;
        }

        $ctrl.hideDialog = function () {
            // Unfortunately blurring here is the only (indirect) solution for having the 
            // blur event directly linked to the touch event (required for iOS)
            // normally this should have been done in the rich-text-editor.component $onDestroy
            $element.find('text-editor')[0].blur();
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

        $ctrl.saveDocumentAsDraft = function() {
            $ctrl.document.draft = true
            $ctrl.saveDocument();
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