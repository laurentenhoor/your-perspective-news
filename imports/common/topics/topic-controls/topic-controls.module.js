import angular from 'angular';

import ShareDialog from './share-dialog/share-dialog.module'
import TopicControlsComponent from './topic-controls.component';

export default angular
    .module('topicControls', [ShareDialog])
    .component('topicControls', TopicControlsComponent)
    .name;