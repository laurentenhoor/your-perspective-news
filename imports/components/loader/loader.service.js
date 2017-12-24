import angular from 'angular';
import angularMeteor from 'angular-meteor';

export default class LoaderService {

    constructor($rootScope, $timeout) {
        'ngInject';

        let showing = true;
        let databaseInitialized = false;

        function hide() {
            $timeout(() => showing = false);
        }
        function show() {
            $timeout(() => showing = true);
        }

        this.databaseInitialized = function () {
            console.log('loaderService.databaseInitialized()')
            databaseInitialized = true;
            hide();
        }

        this.start = function (renderingFinishedCallback) {
            console.log('loaderService.start()');
            show();
            $timeout(() => renderingFinishedCallback(), 200); // Have 200 ms for rendering the loader before changing the url
            $timeout(() => hide(), 10000); // Fallback: hide loader if loading takes very long
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