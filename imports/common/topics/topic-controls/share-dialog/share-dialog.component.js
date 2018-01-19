export default class ShareDialogComponent {

    constructor(Socialshare, $shareDialog, topicId) {
        'ngInject';

        $ctrl = this;
    

        $ctrl.hide = () => {
            $shareDialog.hide();
        }
        
        $ctrl.getShareUrl = () => {
            return 'http://beta.jouwpers.nl/topic/' + topicId;

        }

        $ctrl.getShareText = () => {
            return 'Zoek mee naar het volledige verhaal achter dit nieuws op jouwpers.';
        }
                
        $ctrl.shareLinkedIn = () => {
            Socialshare.share({
                'provider': 'linkedin',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl()
                }
            });
        }

        $ctrl.shareTwitter = () => {
            Socialshare.share({
                'provider': 'twitter',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl(),
                    'socialShareText' : $ctrl.getShareText()
                }
            });
        }
        
        $ctrl.shareFacebook = () => {
            Socialshare.share({
                'provider': 'facebook',
                'attrs': {
                    'socialshareUrl': $ctrl.getShareUrl()
                }
            });
        }
        
    }
}
