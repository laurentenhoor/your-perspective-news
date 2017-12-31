import DialogComponent from './first-use-dialog.component';
import DialogTemplate from './first-use-dialog.html';
import DialogStyle from './first-use-dialog.styl';

export default class FirstUseDialogService {

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