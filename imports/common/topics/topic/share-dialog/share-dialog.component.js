import { Meteor } from 'meteor/meteor';

export default class ShareDialogComponent {

    constructor(Socialshare, $shareDialog, topicId, $timeout) {
        'ngInject';

        $ctrl = this;

        $timeout(()=>$ctrl.loaded=true, 300);
    

        $ctrl.hide = () => {
            $shareDialog.hide();
        }
        
        $ctrl.getShareUrl = () => {
            return Meteor.absoluteUrl() + 'topic/' + topicId;
        }

        $ctrl.getShareText = () => {
            return 'Zoek mee naar het volledige verhaal achter dit nieuws op jouwpers.';
        }
                
        $ctrl.shareLinkedIn = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Share',
                eventAction : 'LinkedIn',
                eventLabel : '/topic/'+topicId
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
                eventAction : 'Twitter',
                eventLabel : '/topic/'+topicId
            })
            Socialshare.share({
                'provider': 'twitter',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl(),
                    'socialShareText' : $ctrl.getShareText()
                }
            });
        }

        $ctrl.shareFacebook = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Share',
                eventAction : 'Facebook',
                eventLabel : '/topic/'+topicId
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
                eventAction : 'Copy-Paste',
                eventLabel : '/topic/'+topicId
            })
        }

        $ctrl.shareWhatsapp = () => {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Share',
                eventAction : 'Whatsapp',
                eventLabel : '/topic/'+topicId
            })
        }
        
    }
}
