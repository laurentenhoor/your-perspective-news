import template from './topic-controls.html';
import style from './topic-controls.styl';

class TopicControlsComponent {

    constructor($reactive, $mdDialog) {
        'ngInject';
        
        var $ctrl = this;
		$reactive($ctrl).attach($scope);
        
        $ctrl.dummyAlert = function(ev) {
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
    controller: TopicControlsComponent,
    templateUrl: template,
}