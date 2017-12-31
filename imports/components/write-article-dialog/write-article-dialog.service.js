
import WriteArticleDialogComponent from './write-article-dialog.component'
import WriteArticleDialogTemplate from './write-article-dialog.html';
import WriteArticleDialogStyle from './write-article-dialog.styl';

export default class WriteArticleDialogService {

    constructor($dialog) {
        'ngInject';
        this.$dialog = $dialog;
    }

    show($event, topicId) {

        let dialogOptions = {
            templateUrl : WriteArticleDialogTemplate,
            controller : WriteArticleDialogComponent,
            targetEvent: $event,
            fullscreen : true,
            locals : {
                topicId : topicId
            }
        };
        
        return this.$dialog.show(dialogOptions);

    }

    hide() {
        return this.$dialog.hide();
    }

}