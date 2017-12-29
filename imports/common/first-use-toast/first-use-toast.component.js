export default class FirstUseToastComponent {

    constructor($scope, $mdToast, $firstUseDialog) {
        'ngInject';

        this.closeToast = function () {
            
            if (!$firstUseDialog.isCurrentlyShown()) 
                $mdToast.hide();

        };

        this.openFirstUseDialog = function ($event) {

            this.closeToast();

            if (!$firstUseDialog.isCurrentlyShown()) 
                $firstUseDialog.show($event);

        }
    }
}