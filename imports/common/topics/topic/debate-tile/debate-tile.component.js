import DebateTileTemplate from './debate-tile.html';
import DebateTileStyle from './debate-tile.styl';

class DebateTileComponent {
    constructor($scope, $reactive) {
        'ngInject';

        var $ctrl = this;
        $reactive($ctrl).attach($scope);


        $ctrl.newQuestion = "";
        
        $ctrl.$onChanges = (changes) => {
            if (changes.topic && $ctrl.topic) {
                console.log('debate tile for topic:', $ctrl.topic);
            }
        }

    }
}

export default {
    templateUrl: DebateTileTemplate,
    controller: DebateTileComponent,
    bindings: {
        topic: '<'
    }
}