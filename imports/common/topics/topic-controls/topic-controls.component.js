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

        $ctrl.writeArticle = function (ev) {
            $mdDialog.show(
                $mdDialog.alert({
                    onComplete: function afterShowAnimation() {
                        var $dialog = angular.element(document.querySelector('md-dialog'));
                        var $actionsSection = $dialog.find('md-dialog-actions');
                        var $cancelButton = $actionsSection.children()[0];
                        angular.element($cancelButton).addClass('md-raised');
                    }
                })
                    .clickOutsideToClose(false)
                    .title('Wil je schrijven?')
                    .textContent('Hier komt binnenkort een editor voor korte opiniestukken...')
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