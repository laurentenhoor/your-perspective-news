import { Meteor } from 'meteor/meteor';

export default class ShareDialogComponent {

    constructor(Socialshare, $shareDialog, topicId, questionId, $timeout) {
        'ngInject';

        $ctrl = this;
        $ctrl.questionId = questionId;

        $timeout(() => $ctrl.loaded = true, 300);

        $ctrl.hide = () => {
            $shareDialog.hide();
        }

        $ctrl.getShareUrl = () => {
            if (questionId) {
                return Meteor.absoluteUrl() + 'vraag/' + questionId + '/' + topicId;
            }
            return Meteor.absoluteUrl() + 'topic/' + topicId;
        }

        $ctrl.getShareText = () => {
            if (questionId) {
                return 'Kun jij ons helpen bij deze vraag?'
            }
            return 'Zoek mee naar het volledige verhaal achter dit nieuws op jouwpers.';
        }

        $ctrl.shareLinkedIn = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Share',
                eventAction: 'LinkedIn',
                eventLabel: (questionId ? '/question/' + questionId : '/topic/' + topicId)
            })
            Socialshare.share({
                'provider': 'linkedin',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl()
                }
            });
        }

        $ctrl.shareTwitter = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Share',
                eventAction: 'Twitter',
                eventLabel: (questionId ? '/question/' + questionId : '/topic/' + topicId)
            })
            Socialshare.share({
                'provider': 'twitter',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl(),
                    'socialShareText': $ctrl.getShareText()
                }
            });
        }

        $ctrl.shareFacebook = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Share',
                eventAction: 'Facebook',
                eventLabel: (questionId ? '/question/' + questionId : '/topic/' + topicId)
            })
            Socialshare.share({
                'provider': 'facebook',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl()
                }
            });
        }

        $ctrl.shareCopyPaste = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Share',
                eventAction: 'Copy-Paste',
                eventLabel: (questionId ? '/question/' + questionId : '/topic/' + topicId)
            })
        }

        $ctrl.shareWhatsapp = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Share',
                eventAction: 'Whatsapp',
                eventLabel: (questionId ? '/question/' + questionId : '/topic/' + topicId)
            })
        }

    }
}
