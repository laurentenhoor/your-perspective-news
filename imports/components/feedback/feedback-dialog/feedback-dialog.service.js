import DialogComponent from './feedback-dialog.component';
import DialogTemplate from './feedback-dialog.html';
import DialogStyle from './feedback-dialog.styl';

import { Meteor } from 'meteor/meteor';
import { Feedback } from '/imports/api/feedback.js';

import SlackAPI from 'node-slack';

export default class FeedbackDialogService {

    constructor($dialog) {
        'ngInject';
        this.$dialog = $dialog;
        this.Slack = new SlackAPI('https://hooks.slack.com/services/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');
    }

    show($event, topic) {
        this.$dialog.show({
            controller: DialogComponent,
            templateUrl: DialogTemplate,
            targetEvent: $event,
            locals: {
            }
        });

    }

    hide($event) {
        return this.$dialog.hide();
    }

    cancel($event) {
        return this.$dialog.cancel();
    }

    storeFeedback(feedback) {
        if (!feedback) {
            return;
        }

        let $dialog = this.$dialog;

        this.Slack.send({
            text: feedback,
            username: Meteor.user() ? Meteor.user().profile.firstName + ' '+ Meteor.user().profile.lastName : 'anoniem',
            icon_url: Meteor.user() ? Meteor.user().profile.pictureUrl : ''
          });


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
            $dialog.show(
                $dialog.alert()
                    .title('Bedankt voor jouw reactie.')
                    .textContent('Samen kunnen wij blijven verbeteren.')
                    .ariaLabel('Feedback')
                    .ok('Sluiten')
            );
        }

    }

}