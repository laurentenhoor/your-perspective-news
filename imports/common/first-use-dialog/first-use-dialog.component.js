import style from './first-use-dialog.styl';

export default class FirstUseDialogComponent {

    constructor($scope, $firstUseDialog, $feedbackDialog) {
        'ngInject';

        this.like = function() {
            $firstUseDialog.hide();
        };

        this.dislike = function() {
            $firstUseDialog.hide()
                .then($feedbackDialog.show());  
        };

    }

}