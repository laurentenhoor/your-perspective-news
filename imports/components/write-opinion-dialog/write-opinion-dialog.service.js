
import WriteOpinionDialogComponent from './write-opinion-dialog.component'
import WriteOpinionDialogTemplate from './write-opinion-dialog.html';
import WriteOpinionDialogStyle from './write-opinion-dialog.styl';

export default class WriteOpinionDialogService {

    constructor($dialog) {
        'ngInject';
        this.$dialog = $dialog;
    }

    show($event, topicId) {

        let dialogOptions = {
            templateUrl : WriteOpinionDialogTemplate,
            controller : WriteOpinionDialogComponent,
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