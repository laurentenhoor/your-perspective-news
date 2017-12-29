import angular from 'angular';

export default class FirstUseToastComponent {

    constructor($scope, $mdToast, $firstUseDialog) {
        'ngInject';

        let isDialogOpen = false;

        $scope.closeToast = function () {
            if (isDialogOpen) return;

            $mdToast
                .hide()
                .then(function () {
                    isDialogOpen = false;
                });
        };

        $scope.openMoreInfo = function ($event) {    
            
            console.log('toast openMoreInfo()')

            $scope.closeToast();

            if (isDialogOpen) return;
                isDialogOpen = true;

            console.log($firstUseDialog);
            
            $firstUseDialog.show($event).then(function () {
                isDialogOpen = false;
            });

            // $mdDialog
            //     .show($mdDialog
            //         .alert({
            //             onComplete: function afterShowAnimation() {
            //                 var $dialog = angular.element(document.querySelector('md-dialog'));
            //                 var $actionsSection = $dialog.find('md-dialog-actions');
            //                 var $cancelButton = $actionsSection.children()[0];
            //                 angular.element($cancelButton).addClass('md-raised');
            //             }
            //         })
            //         .title('Wat is jouwpers?')
            //         .htmlContent()
            //         .ok('Ga door')
            //         .targetEvent($event) 
            //     )
            //     .then(function () {
            //         isDialogOpen = false;
            //     });
        }
    }
}
