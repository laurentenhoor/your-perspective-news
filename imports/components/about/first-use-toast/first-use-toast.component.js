import FirstUseToastStyle from './first-use-toast.styl';

export default class FirstUseToastComponent {

    constructor($scope, $mdToast, $firstUseDialog) {
        'ngInject';

        this.closeToast = function ($event) {
            
            if (!$firstUseDialog.isCurrentlyShown()) 
                $mdToast.hide($event);

        };

        this.openFirstUseDialog = function ($event) {

            this.closeToast($event);

            if (!$firstUseDialog.isCurrentlyShown()) {
                $firstUseDialog.show($event);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'About',
                    eventAction: 'Open about',
                    eventLabel: 'Via Pop-up'
                })
            }

        }
    }
}