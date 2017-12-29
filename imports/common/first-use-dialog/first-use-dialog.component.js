import style from './first-use-dialog.styl';

export default class FirstUseDialogComponent {

    constructor($scope, $mdDialog) {
        'ngInject';

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

    }

}