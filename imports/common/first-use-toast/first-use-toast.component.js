export default class FirstUseToastComponent {

    constructor($scope, $mdToast, $firstUseDialog) {
        'ngInject';

        $scope.closeToast = function () {
            
            if (!$firstUseDialog.isCurrentlyShown()) 
                $mdToast.hide();

        };

        $scope.openFirstUseDialog = function ($event) {

            $scope.closeToast();

            if (!$firstUseDialog.isCurrentlyShown()) 
                $firstUseDialog.show($event);

        }
    }
}