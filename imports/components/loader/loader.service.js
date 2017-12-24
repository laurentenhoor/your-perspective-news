import angular from 'angular';
import angularMeteor from 'angular-meteor';

export default class LoaderService {

    constructor($timeout) {
        'ngInject';

        let showing = true;
        let databaseInitialized = false;

        function setShowing(value) {
            $timeout(() => showing = value); // Why is $timeout required here? Something with responsiveness?
        }
        function hide() {
            setShowing(false);
        }
        function show() {
            setShowing(true);
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