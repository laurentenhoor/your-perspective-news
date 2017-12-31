import DialogComponent from './article-actions-dialog.component';
import DialogTemplate from './article-actions-dialog.html';
import DialogStyle from './article-actions-dialog.styl';

export default class ArticleActionsDialogService {

    constructor($dialog) {
        'ngInject';

        this.$dialog = $dialog;

    }

    show($event, topicId, category, article) {
        
        let dialogOptions = {
            controller: DialogComponent,
            templateUrl: DialogTemplate,
            targetEvent: $event,
            locals: {
                topicId: topicId,
                category: category,
                article: article,
            }
        }

        return this.$dialog.show(dialogOptions)
            .then(function (answer) {
                console.log('You answered the dialog.')
            }, function (answer) {
                console.log('You cancelled the dialog.')
            });
    }

    hide($event) {
        return this.$dialog.hide();
    }

}