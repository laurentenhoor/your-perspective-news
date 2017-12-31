import DialogComponent from './article-actions-dialog.component';
import DialogTemplate from './article-actions-dialog.html';
import DialogStyle from './article-actions-dialog.styl';

export default class ArticleActionsDialogService {

    constructor($mdDialog, $dialog) {
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.$dialog = $dialog;

    }

    show($event, topicId, category, article) {
        
        let options = {
            controller: DialogComponent,
            templateUrl: DialogTemplate,
            targetEvent: $event,
            locals: {
                topicId: topicId,
                category: category,
                article: article,
            },

            controllerAs: '$ctrl',
            clickOutsideToClose: false,
            fullscreen: false,
        }

        console.log(options);

        return this.$dialog.show(options)
            .then(function (answer) {
                console.log('You answered the dialog.')
            }, function (answer) {
                console.log('You cancelled the dialog.')
            });


        // return this.$mdDialog.show({
        //     controller: DialogComponent,
        //     controllerAs: '$ctrl',
        //     templateUrl: DialogTemplate,
        //     // parent: angular.element(document.body),
        //     targetEvent: $event,
        //     clickOutsideToClose: false,
        //     fullscreen: false,// Only for -xs, -sm breakpoints.
        //     locals: {
        //         topicId: topicId,
        //         category: category,
        //         article: article,
        //     },
        // })
        //     .then(function (answer) {
        //         console.log('You answered the dialog.')
        //     }, function () {
        //         console.log('You cancelled the dialog.')
        //     });
    }

    hide($event) {
        return this.$dialog.hide();
        // return this.$mdDialog.hide();
    }

}