import angular from 'angular';

import TopicComponent from './topic.component';

import TopicControls from './topic-controls/topic-controls.module';
import SummaryTile from './summary-tile/summary-tile.module';
import ArticleTiles from './article-tiles/article-tiles.module';
import CommentsTile from './comments-tile/comments-tile.module';
import OpinionTile from './opinion-tile/opinion-tile.module';

export default angular
    .module('Topic', [
        TopicControls,
        SummaryTile,
        ArticleTiles,
        CommentsTile,
        OpinionTile,
    ])
    .component('topic', TopicComponent)
    .name;