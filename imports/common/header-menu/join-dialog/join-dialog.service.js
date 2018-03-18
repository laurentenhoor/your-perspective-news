import DialogComponent from './join-dialog.component';
import DialogTemplate from './join-dialog.html';
import DialogStyle from './join-dialog.styl';

export default class JoinDialogService {

    constructor($dialog) {
        'ngInject';
        this.$dialog = $dialog;
        this.dialogIsCurrentlyShown = false;
    }

    show($event) {

        this.dialogIsCurrentlyShown = true;

        return this.$dialog.show({
            controller: DialogComponent,
            templateUrl: DialogTemplate,
            targetEvent: $event,
            fullscreen: true,
        }).then(() => {
            this.dialogIsCurrentlyShown = false
        });
    }
    
    hide($event) {
        return this.$dialog.hide();
    }

    isCurrentlyShown() {
        return this.dialogIsCurrentlyShown;
    }

}