import template from './topic-controls.html';
import style from './topic-controls.styl';

class TopicControlsComponent {

    constructor($reactive, $scope, $mdDialog, $autoScroll)  {
        'ngInject';

        var $ctrl = this;
        $reactive($ctrl).attach($scope);

        $ctrl.$onChanges = function(changes) {
            if (changes.topicId) {
              $ctrl.topicId = angular.copy($ctrl.topicId);
            }
        }

        $ctrl.discuss =function(topicId) {
			console.log('clickChat');
			$autoScroll.horizontalScroll('discuss-'+topicId, 'scroll-'+topicId);
		}

        $ctrl.writeArticle = function () {

        }

        $ctrl.dummyAlert = function (ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title('Nieuwe knop!')
                    .textContent('Waarvoor?')
                    .ariaLabel('')
                    .ok('Annuleren')
                    .targetEvent(ev)
            );
        }

    }

}

export default {
    bindings: {
        topicId: '<'
    },
    controller: TopicControlsComponent,
    templateUrl: template,
}