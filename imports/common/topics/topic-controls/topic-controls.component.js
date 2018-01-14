import template from './topic-controls.html';
import style from './topic-controls.styl';

class TopicControlsComponent {

    constructor($reactive, $scope, $dialog, $autoScroll, $writeOpinionDialog, $auth, $timeout, Socialshare) {
        'ngInject';

        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.$onChanges = function (changes) {
            if (changes.topicId) {
                $ctrl.topicId = angular.copy($ctrl.topicId);
            }
            if (changes.showDetails) {
                $ctrl.detailsAreShown = angular.copy($ctrl.showDetails);
            }
        }

        $ctrl.discuss = function (topicId) {
            console.log('clickChat');
            $autoScroll.horizontalScroll('discuss-' + topicId, 'scroll-' + topicId);
        }

        $ctrl.writeOpinion = function ($event) {
            if ($auth.isLoggedIn()) {
                $writeOpinionDialog.show($event, $ctrl.topicId);
            }

        }

        $ctrl.toggleDetailsVisibility = function () {
            $ctrl.detailsAreShown = !$ctrl.detailsAreShown;
            $ctrl.onShowDetails({ $event: { showDetails: $ctrl.detailsAreShown } });
        }

        $ctrl.shareFacebook = function (topicId) {
            Socialshare.share({
                'provider': 'facebook',
                'attrs': {
                    'socialshareUrl': 'http://wij.jouwpers.nl/topic/' + topicId
                }
            });
        }

    }

}

export default {
    bindings: {
        topicId: '<',
        onShowDetails: '&',
        showDetails: '<'
    },
    controller: TopicControlsComponent,
    templateUrl: template,
}