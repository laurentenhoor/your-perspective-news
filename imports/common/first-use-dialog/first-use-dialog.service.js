import DialogComponent from './first-use-dialog.component';
import DialogTemplate from './first-use-dialog.html';
import DialogStyle from './first-use-dialog.styl';

export default class FirstUseDialog {

    static factory($mdDialog) {
        'ngInject';
        return new FirstUseDialog($mdDialog);
    }

    constructor($mdDialog) {
        this.$mdDialog = $mdDialog;
        this.dialogIsCurrentlyShown = false;
    }

    show($event) {

        this.dialogIsCurrentlyShown = true;

        return this.$mdDialog.show({
            controller: DialogComponent,
            templateUrl: DialogTemplate,
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: false,
            fullscreen: true, // Only for -xs, -sm breakpoints.
        }).then(() => {
            this.dialogIsCurrentlyShown = false
        });
    }

    hide($event) {
        return this.$mdDialog.hide();
    }

    isCurrentlyShown() {
        return this.dialogIsCurrentlyShown;
    }

}