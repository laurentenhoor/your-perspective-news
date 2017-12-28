export default class FirstUseToastComponent {

    constructor($scope, $mdToast, $mdDialog) {
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

        $scope.openMoreInfo = function (e) {
            
            console.log('openMoreInfo')
            $scope.closeToast();

            if (isDialogOpen) return;
            isDialogOpen = true;
            
            
            console.log('open dialog');
            

            $mdDialog
                .show($mdDialog
                    .alert({
                        onComplete: function afterShowAnimation() {
                            var $dialog = angular.element(document.querySelector('md-dialog'));
                            var $actionsSection = $dialog.find('md-dialog-actions');
                            var $cancelButton = $actionsSection.children()[0];
                            angular.element($cancelButton).addClass('md-raised');
                        }
                    })
                    .title('Wat is jouwpers?')
                    .htmlContent(`Genuanceerde discussies op basis van vragen, meningen en feiten bij het dagelijkse nieuws.<br>
                    <br>Door een community van betrokken Nederlanders zonder mogelijkheid om te verschuilen achter een digitale identiteit. 
                    <br><br>Wij verzetten ons tegen twittergeblaat en nepnieuws.`)
                    .ariaLabel('Jouwpers informatie')
                    .ok('Ga door')
                    .targetEvent(e) 
                )
                .then(function () {
                    isDialogOpen = false;
                });
        }
    }
}
