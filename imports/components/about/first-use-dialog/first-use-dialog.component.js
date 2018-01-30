import style from './first-use-dialog.styl';

export default class FirstUseDialogComponent {

    constructor($scope, $firstUseDialog, $feedbackDialog) {
        'ngInject';

        this.like = function() {
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Like'
            })
            $firstUseDialog.hide();
        };

        this.dislike = function() {
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Dislike'
            })
            $firstUseDialog.hide()
                .then($feedbackDialog.show());  
        };

        this.close = function() {
            ga('send', {
                hitType: 'event',
                eventCategory: 'About',
                eventAction: 'Close about'
            })
            $firstUseDialog.hide();
        }

    }

}