import { Meteor } from 'meteor/meteor';
import { Opinions } from '/imports/api/opinions.js';

import angular from 'angular';

import SlackAPI from 'node-slack';

export default class WriteOpinionDialogComponent {

    constructor(topicId, $writeOpinionDialog, $metadata, $articlesApi, $element, $auth) {
        'ngInject';

        console.log('init WriteOpinionDialog')
        var $ctrl = this;

        var Slack = new SlackAPI('https://hooks.slack.com/services/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');

        // $ctrl.topicId = topicId;
        // $ctrl.articles = $articlesApi.getByTopicId($ctrl.topicId);
        // console.log($ctrl.articles)

        var opinion = Opinions.find({ ownerId: Meteor.userId(), draft : true }, { sort: { updatedAt: -1 }, limit: 1 }).fetch()[0];
        console.log('loaded Opinion', opinion)

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
                email: $auth.getEmail(),
                articles: [],
                score: 0,
                ownerId: Meteor.userId(),
                draft: true,
                new: true,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
        }
        $ctrl.initContent = angular.copy($ctrl.document.content);

        $ctrl.receiveHtml = function ($event) {
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
            // $ctrl.document = angular.toJSON($ctrl.document)
            console.log('document for save', $ctrl.document)

            let document = angular.copy($ctrl.document);
        
            angular.forEach(document.articles, (article, i) =>{
                delete article.$$hashKey;
                document.articles[i] = article;
            })
            Opinions.upsert({ _id: $ctrl.document._id }, document, (error, result) => {
                if (error)
                    return console.error(error);
                console.log(result);

                if (document.title) {
                    Slack.send({
                        username: document.title +' [' +  (document.draft ? 'DRAFT' : 'FINAL' ) + ']',
                        text: document.content.replace(/<\/?[^>]+(>|$)/g, "") + ' '+ (document.articles[0] ? document.articles[0].url:'') + (document.articles[1] ? ' Er zijn meer bronnen toegevoegd maar hier niet weergeven...':'') + ' Email: ' + ($auth.getEmail() ? $auth.getEmail() : document.email)
                    });
                }
                
            });
            $ctrl.hideDialog();
        }

        $ctrl.saveDocumentAsDraft = function () {
            $ctrl.document.draft = true
            $ctrl.saveDocument();
        }

        $ctrl.publishDocument = function () {
            $ctrl.document.draft = false
            $ctrl.saveDocument();
        }

        $ctrl.urlChange = function () {
            $metadata.getArticleFromUrl($ctrl.article.url, (error, article) => {
                if (error) {
                    return console.error(error);
                }
                if (!$ctrl.document.articles) {
                    $ctrl.document.articles = []
                }
                $ctrl.article.url = null;
                $ctrl.document.articles.push(article);
            });

        }

        $ctrl.addArticleRef = function ($event) {
            $ctrl.addArticle = angular.copy($event.article);
        }

    }

}