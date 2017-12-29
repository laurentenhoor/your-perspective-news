import DialogTemplate from './first-use-dialog.html';
import DialogStyle from './first-use-dialog.styl';
import DialogComponent from './first-use-dialog.component'

export default class FirstUseDialog {

	static factory($mdDialog) {
		'ngInject';
		return new FirstUseDialog($mdDialog);
    }

	constructor($mdDialog) {
        return {
            show: show
        }

        function show($event) {    
           return $mdDialog.show({
                controller: DialogComponent,
                templateUrl: DialogTemplate,
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: true, // Only for -xs, -sm breakpoints.
              })
        }

	}

}