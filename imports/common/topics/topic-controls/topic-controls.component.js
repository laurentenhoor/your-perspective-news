import template from './topic-controls.html';
import style from './topic-controls.styl';

class TopicControlsComponent {

    constructor($reactive, $scope, $dialog, $autoScroll, $writeArticleDialog)  {
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

        $ctrl.writeArticle = function ($event) {
            $writeArticleDialog.show($event, $ctrl.topicId);

            // $dialog.show(
            //     $dialog.alert()
            //         .title('Wil je schrijven?')
            //         .textContent('Hier komt binnenkort een editor voor korte opiniestukken...')
            //         .ariaLabel('')
            //         .ok('Sluiten')
            //         .targetEvent($event)
            // );

        }

    }

}

export default {
    bindings: {
        topicId: '<',
    },
    controller: TopicControlsComponent,
    templateUrl: template,
}