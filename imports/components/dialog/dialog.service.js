import angular from 'angular';

function getDefaultOptions() {
    return {
        controllerAs: '$ctrl',
        clickOutsideToClose: false,
        fullscreen: false,
    }
}

export default class DialogService {

    constructor($mdDialog, $scrollDisabler) {
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.$scrollDisabler = $scrollDisabler;

    }

    show(options) {
        
        if (!options._options) {
            options = Object.assign(getDefaultOptions(), options);
        }
        this.$scrollDisabler.disable();

        return this.$mdDialog.show(options)
            .finally(() => {
                this.$scrollDisabler.enable();
            });

    }

    hide(response) {
        this.$scrollDisabler.enable();
        return this.$mdDialog.hide(response)
    }

    cancel(response) {
        this.$scrollDisabler.enable();
        return this.$mdDialog.cancel(response)
    }

    confirm() {
        return this.$mdDialog.confirm({
            onComplete: function afterShowAnimation() {
                var $dialog = angular.element(document.querySelector('md-dialog'));
                var $actionsSection = $dialog.find('md-dialog-actions');
                var $cancelButton = $actionsSection.children()[0];
                var $confirmButton = $actionsSection.children()[1];
                angular.element($confirmButton).addClass('md-raised');
                angular.element($cancelButton).addClass('md-raised').removeClass('md-primary');
            }
        })
        .clickOutsideToClose(false)
    }

    alert() {
        return this.$mdDialog.alert({
            onComplete: function afterShowAnimation() {
                var $dialog = angular.element(document.querySelector('md-dialog'));
                var $actionsSection = $dialog.find('md-dialog-actions');
                var $cancelButton = $actionsSection.children()[0];
                angular.element($cancelButton).addClass('md-raised');
            }
        })
        .clickOutsideToClose(false);
    }

}
