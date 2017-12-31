import { Meteor } from 'meteor/meteor';
import { Opinions } from '/imports/api/opinions.js';

export default class WriteArticleDialogComponent {

    constructor(topicId, $writeArticleDialog) {
        'ngInject';

        console.log('init WriteArticleDialog')
        var $ctrl = this;
        
        $ctrl.topicId = topicId;

        var opinion = Opinions.findOne({topicId: $ctrl.topicId}, {});
        
        if (opinion) {
            $ctrl.document = opinion;
            $ctrl.document.new = false
        } else {
            $ctrl.document = {
                title: '',
                content: '',
                imageUrl: '',
                refs : [],
                topicId: topicId,
                ownerId : Meteor.userId(),
                draft: true,
                new: true,
            }
        }

        $ctrl.addArticleRef = function ($event) {
            console.log($event.article.title);

            var spacing = '';
            if ($ctrl.document.content != '') {
                spacing = ' ';
            }
            $ctrl.document.content = $ctrl.document.content + spacing + '#' + $event.article.publisher +': ' + '' + $event.article.title + '#';
        }

        $ctrl.hide = function () {
            $writeArticleDialog.hide();
        }

        $ctrl.saveDocument = function() {
            console.log($ctrl.document)
            Opinions.upsert({_id: $ctrl.document._id}, $ctrl.document, (error, result) => {
                if (error)
                    return console.error(error);
                console.log(result);
            });
            $ctrl.hide();
        }

    }

}