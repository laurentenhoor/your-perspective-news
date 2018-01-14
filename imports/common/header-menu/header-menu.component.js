
import HeaderMenuTemplate from './header-menu.html';
import HeaderMenuStyle from './header-menu.styl';

class HeaderMenuComponent {

    constructor($scope, $rootScope, $location, $window, $firstUseDialog, $firstUseToast, $filter) {
        'ngInject'

        $scope.now = new Date();

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.window = $window;

        $scope.clickLogo = function ($event) {
            console.log('logo clicked')
            $firstUseToast.hide();
            $firstUseDialog.show($event);
        }
       
    }

}

export default {
    templateUrl: HeaderMenuTemplate,
    controller: HeaderMenuComponent,
    bindings : {}
}