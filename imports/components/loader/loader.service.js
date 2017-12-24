import angular from 'angular';
import angularMeteor from 'angular-meteor';

export default class LoaderService {

    constructor($rootScope, $timeout) {
        'ngInject';

        let showing = true;
        let databaseInitialized = false;

        function hide() {
            $timeout(()=>showing = false);
        }
        function show() {
            $timeout(()=>showing = true);
        }

        this.databaseInitialized = function () {
            console.log('loaderService.databaseInitialized()')
            databaseInitialized = true;
            hide();
        }

        this.start = function () {
            console.log('loaderService.start()');
            show();
        }

        this.stop = function () {
            console.log('loaderService.stop()');
            if (databaseInitialized)
                hide();
        }

        this.isVisible = function () {
            return showing;
        }

    }

}