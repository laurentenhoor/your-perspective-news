import DialogComponent from './article-actions-dialog.component';
import DialogTemplate from './article-actions-dialog.html';
import DialogStyle from './article-actions-dialog.styl';

export default class ArticleActionsDialog {

    static factory($mdDialog) {
        'ngInject';
        return new ArticleActionsDialog($mdDialog);
    }

    constructor($mdDialog) {
        this.$mdDialog = $mdDialog;

    }

    show($event, topicId, category, article) {
        return $mdDialog.show({
            controller: DialogComponent,
            controllerAs: '$ctrl',
            templateUrl: DialogTemplate,
            // parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: false,
            fullscreen: false,// Only for -xs, -sm breakpoints.
            locals: {
                topicId: topicId,
                category: category,
                article: article,
            },
        })
            .then(function (answer) {
                console.log('You answered the dialog.')
            }, function () {
                console.log('You cancelled the dialog.')
            });
    }

    hide($event) {
        return this.$mdDialog.hide();
    }

}