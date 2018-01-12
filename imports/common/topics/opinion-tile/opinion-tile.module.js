import angular from 'angular';

import OpinionControls from './opinion-controls/opinion-controls.module';
import OpinionTileComponent from './opinion-tile.component';

export default angular
    .module('OpinionTile', [OpinionControls])
    .component('opinionTile', OpinionTileComponent)
    .name;