import ShareDialogTemplate from './share-dialog.html';
import ShareDialogComponent from './share-dialog.component';
import ShareDialogStyle from './share-dialog.styl';

export default class ShareDialogService {

    constructor($dialog) {
        'ngInject'

        this.$dialog = $dialog;

    }

    show($event, topicId, questionId) {

        console.log('show with questionId', questionId)
        
        let dialogOptions = {
            controller: ShareDialogComponent,
            templateUrl: ShareDialogTemplate,
            targetEvent: $event,
            locals: {
                topicId: topicId,
                questionId: questionId
            }
        }

        return this.$dialog.show(dialogOptions)
            .then(function (answer) {
                console.log('You answered the sharing dialog.')
            }, function (answer) {
                console.log('You cancelled the sharing dialog.')
            });
    }

    hide($event) {
        return this.$dialog.hide();
    }
}