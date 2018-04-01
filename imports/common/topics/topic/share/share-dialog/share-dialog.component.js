import { Meteor } from 'meteor/meteor';

export default class ShareDialogComponent {

    constructor(Socialshare, $shareDialog, topicId, questionId, $timeout) {
        'ngInject';

        $ctrl = this;
        $ctrl.questionId = questionId;
        
        $ctrl.topicId = topicId;

        $timeout(() => $ctrl.loaded = true, 1000);

        $ctrl.hide = () => {
            $shareDialog.hide();
        }

        $ctrl.getShareUrl = () => {
            if ($ctrl.questionId) {
                return Meteor.absoluteUrl() + 'vraag/' + $ctrl.questionId + '/' + $ctrl.topicId;
            }
            else if ($ctrl.topicId) {
                return Meteor.absoluteUrl() + 'topic/' + $ctrl.topicId;
            }
            else {
                return Meteor.absoluteUrl()
            }
            
        }

        $ctrl.getShareText = () => {
            if ($ctrl.questionId) {
                return 'Kun jij ons helpen met deze vraag?';
            }
            else if ($ctrl.topicId) {
                return 'Zoek mee naar het volledige verhaal achter dit nieuws op jouwpers.';
            }
            else {
                return 'Stap uit je filterbubbel!'
            }
            
        }

        $ctrl.shareLinkedIn = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: ($ctrl.questionId ? 'Share Question' : 'Share Topic'),
                eventAction: 'LinkedIn',
                eventLabel: ($ctrl.questionId ? '/question/' + $ctrl.questionId : '/topic/' + $ctrl.topicId)
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
                eventCategory: ($ctrl.questionId ? 'Share Question' : 'Share Topic'),
                eventAction: 'Twitter',
                eventLabel: ($ctrl.questionId ? '/question/' + $ctrl.questionId : '/topic/' + $ctrl.topicId)
            })
            Socialshare.share({
                'provider': 'twitter',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl(),
                    'socialshareText': $ctrl.getShareText(),
                    'socialshareVia' : 'Jouwpers'
                }
            });
        }

        $ctrl.shareFacebook = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: ($ctrl.questionId ? 'Share Question' : 'Share Topic'),
                eventAction: 'Facebook',
                eventLabel: ($ctrl.questionId ? '/question/' + $ctrl.questionId : '/topic/' + $ctrl.topicId)
            })
            Socialshare.share({
                'provider': 'facebook',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl(),
                    'socialshareQuote' : $ctrl.getShareText(),
                    'socialshareHashtags': '#jouwpers',
                    'socialshareVia' : '2032895950321536'
                }
            });
        }

        $ctrl.shareCopyPaste = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: ($ctrl.questionId ? 'Share Question' : 'Share Topic'),
                eventAction: 'Copy-Paste',
                eventLabel: ($ctrl.questionId ? '/question/' + $ctrl.questionId : '/topic/' + $ctrl.topicId)
            })
        }

        $ctrl.shareWhatsapp = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: ($ctrl.questionId ? 'Share Question' : 'Share Topic'),
                eventAction: 'Whatsapp',
                eventLabel: ($ctrl.questionId ? '/question/' + $ctrl.questionId : '/topic/' + $ctrl.topicId)
            })
        }

    }
}
