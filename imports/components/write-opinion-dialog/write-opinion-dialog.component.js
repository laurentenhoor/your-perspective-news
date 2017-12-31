import { Meteor } from 'meteor/meteor';
import { Opinions } from '/imports/api/opinions.js';

export default class WriteOpinionDialogComponent {

    constructor(topicId, $writeOpinionDialog, $metadata) {
        'ngInject';

        console.log('init WriteOpinionDialog')
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
            var spacing = '';
            if ($ctrl.document.content != '') {
                spacing = ' ';
            }
            $ctrl.document.content = 
                $ctrl.document.content + spacing 
                + '@' +$event.article.publisher 
                +' #' + $event.article.title.replace(new RegExp(' ', 'g'), '_') + ' ';
        }

        $ctrl.hide = function () {
            $writeOpinionDialog.hide();
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

        $ctrl.urlChange = function() {
            console.log($ctrl.article.url);
            $ctrl.newArticle = $metadata.getArticleFromUrl($ctrl.article.url);
            console.log($ctrl.newArticle);
        }

    }

}