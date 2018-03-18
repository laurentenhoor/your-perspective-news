import style from './join-dialog.styl';

export default class JoinDialogComponent {

    constructor($scope, $joinDialog) {
        'ngInject';

        var $ctrl = this;

        $ctrl.close = ($event) => {
            $joinDialog.hide($event)
        }

    }

}