import ComponentTemplate from './share.html';

class ShareComponent {
    constructor($shareDialog) {
        'ngInject';

        var $ctrl = this;

        $ctrl.share = ($event, topicId) => {
            $shareDialog.show($event, topicId);
        }

    }
}

export default {
    templateUrl: ComponentTemplate,
    controller: ShareComponent,
    bindings: {
        topicId: '<'
    }
}