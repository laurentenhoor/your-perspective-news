import TopicTemplate from './topic.html';
import TopicStyle from './topic.styl';

class TopicComponent {
    constructor() {
        'ngInject';

        $ctrl = this;

        $ctrl.$onChanges = (changes) => {
            if (changes.topic) {
                $ctrl.topic = angular.copy($ctrl.topic);
                console.log('init topic', $ctrl.topic)
            }
        }

    }

}

export default {
    templateUrl: TopicTemplate,
    controller: TopicComponent,
    bindings: {
        topic: '<'
    }
}