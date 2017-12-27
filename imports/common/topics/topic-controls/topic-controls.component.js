import template from './topic-controls.html';
import style from './topic-controls.styl';

class TopicControlsComponent {

    constructor() {
        'ngInject';

        console.log('TopicControlsComponent init');
        
    }

}

export default {
    controller: TopicControlsComponent,
    templateUrl: template,
}