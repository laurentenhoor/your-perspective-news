import angular from 'angular';
import angularMeteor from 'angular-meteor';

export default class LoaderService {

    constructor($timeout) {
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

        this.start = function() {
            console.log('loaderService.start()');
            show();            
        }   

        this.startAndWait = function(delayedFunction, intervalInMs) {
            show();
            if (!intervalInMs) {
                intervalInMs = 300;
            }
            $timeout(()=> {
                if (delayedFunction) {
                    delayedFunction();
                }
            }, intervalInMs);
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