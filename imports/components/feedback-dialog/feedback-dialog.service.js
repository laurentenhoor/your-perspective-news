import DialogComponent from './feedback-dialog.component';
import DialogTemplate from './feedback-dialog.html';
import DialogStyle from './feedback-dialog.styl';

import { Meteor } from 'meteor/meteor';
import { Feedback } from '/imports/api/feedback.js';

export default class FeedbackDialog {

    static factory($mdDialog) {
        'ngInject';
        return new FeedbackDialog($mdDialog);
    }

    constructor($mdDialog) {
        this.$mdDialog = $mdDialog;
    }

    show($event) {

        this.$mdDialog.show({
            controller: DialogComponent,
            controllerAs: '$ctrl',
            templateUrl: DialogTemplate,
            // parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: false,
            fullscreen: false,// Only for -xs, -sm breakpoints.
        });


    }

    hide($event) {
        return this.$mdDialog.hide();
    }

    cancel($event) {
        return this.$mdDialog.cancel();
    }

    storeFeedback(feedback) {
        if (!feedback) {
            return;
        }

        let $mdDialog = this.$mdDialog;

        console.log(Meteor.user())

        Feedback.insert({
            ownerId: Meteor.userId(),
            ownerName: Meteor.user() ? Meteor.user().profile.firstName : 'null',
            email: Meteor.user() ? Meteor.user().profile.emailAddress : 'null',
            // ip: $rootScope.ip,
            feedback: feedback,

        }, function (error, _id) {

            if (error) {
                console.error(error);
                return;
            }
            console.log('sucessful insert with id: ' + _id);

            confirmSuccesfulFeedbackStorage();

        });

        function confirmSuccesfulFeedbackStorage() {
            $mdDialog.show(
                $mdDialog.alert({
                    onComplete: function afterShowAnimation() {
                        var $dialog = angular.element(document.querySelector('md-dialog'));
                        var $actionsSection = $dialog.find('md-dialog-actions');
                        var $cancelButton = $actionsSection.children()[0];
                        angular.element($cancelButton).addClass('md-raised');
                    }
                })
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(false)
                    .title('Bedankt voor jouw reactie.')
                    .textContent('Samen kunnen wij blijven verbeteren.')
                    .ariaLabel('Feedback')
                    .ok('Sluiten')
            );
        }
        
    }

}