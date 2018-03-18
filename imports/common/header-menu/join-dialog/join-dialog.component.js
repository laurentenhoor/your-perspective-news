import style from './join-dialog.styl';
import SlackAPI from 'node-slack';

import { Emails } from '/imports/api/emails'

export default class JoinDialogComponent {

    constructor($scope, $joinDialog, $dialog) {
        'ngInject';

        var $ctrl = this;
        var Slack = new SlackAPI('https://hooks.slack.com/services/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');

        $ctrl.close = ($event) => {
            $joinDialog.hide($event)
        }

        $ctrl.clickJoin = (email) => {
            if (!email || email.length < 4) {
                console.warn('no valid email')
                return;
            }
            console.log('new subscription with email:', email);
            Emails.insert({email:email, type:'verrijker'}, (error, result) => {
                if (error) {
                    console.error(error);
                }
                $ctrl.email = null;
                $dialog.show(
                    $dialog.alert()
                        .title('Bedankt voor je inschrijving.')
                        .textContent('Wij nemen zo snel mogelijk contact met je op. Het emailadres dat je hebt doorgegeven is: '+ email)
                        .ariaLabel('Inschrijving')
                        .ok('Sluiten')
                );
            })
            Slack.send({
                text: 'Ik wil graag verrijker worden! Email me op ' + email,
            });
        }

    }

}