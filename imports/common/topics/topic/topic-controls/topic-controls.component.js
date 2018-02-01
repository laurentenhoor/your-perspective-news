import template from './topic-controls.html';
import style from './topic-controls.styl';

class TopicControlsComponent {

    constructor($reactive, $scope, $dialog, $autoScroll, $writeOpinionDialog, $auth, $timeout, $shareDialog) {
        'ngInject';

        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.thisTopicIsOpen = () => {
            return ($ctrl.topicId == $ctrl.openTopicId)
        }

        $ctrl.toggleTopicOpen = function () {
            let thisTopicIdShouldOpenNext = $ctrl.topicId;
            if ($ctrl.thisTopicIsOpen()) {
                thisTopicIdShouldOpenNext = null;
            } 
            $ctrl.onOpenTopic({$event: {openTopicId: thisTopicIdShouldOpenNext}})
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

        $ctrl.share = function($event, topicId) {
            $shareDialog.show($event, topicId);
        }

    }

}

export default {
    bindings: {
        topicId: '<',
        onOpenTopic:'&',
        openTopicId: '<'
    },
    controller: TopicControlsComponent,
    templateUrl: template,
    transclude : true,
}