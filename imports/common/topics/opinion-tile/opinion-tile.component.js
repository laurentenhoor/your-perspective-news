import OpinionTileTemplate from './opinion-tile.html';
import OpinionTileStyle from './opinion-tile.styl';

class OpinionTileComponent {

    constructor() {
        'ngInject';
    }

}

export default {
    templateUrl: OpinionTileTemplate,
    controller: OpinionTileComponent,
    bindings : {
        topicId : '<'
    }
}