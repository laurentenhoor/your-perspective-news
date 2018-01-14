export default class ShareDialogComponent {

    constructor(Socialshare, $shareDialog, topicId) {
        'ngInject';

        $ctrl = this;

        $ctrl.hide = () => {
            $shareDialog.hide();
        }

        
        $ctrl.shareLinkedIn = () => {
            Socialshare.share({
                'provider': 'linkedin',
                'attrs': {
                    'socialshareUrl': 'http://wij.jouwpers.nl/topic/' + topicId
                }
            });
        }

        $ctrl.shareWhatsapp = () => {
            Socialshare.share({
                'provider': 'whatsapp',
                'attrs': {
                    'socialshareUrl': 'http://wij.jouwpers.nl/topic/' + topicId
                }
            });
        }

        $ctrl.shareTwitter = () => {
            Socialshare.share({
                'provider': 'twitter',
                'attrs': {
                    'socialshareUrl': 'http://wij.jouwpers.nl/topic/' + topicId
                }
            });
        }
        
        $ctrl.shareFacebook = () => {
            Socialshare.share({
                'provider': 'facebook',
                'attrs': {
                    'socialshareUrl': 'http://wij.jouwpers.nl/topic/' + topicId
                }
            });
        }
        
    }
}
