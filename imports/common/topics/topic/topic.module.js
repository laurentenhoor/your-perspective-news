import angular from 'angular';

import TopicComponent from './topic.component';

import TopicControls from './topic-controls/topic-controls.module';
import SummaryTile from './summary-tile/summary-tile.module';
import ArticleTiles from './article-tiles/article-tiles.module';
import CommentsTile from './comments-tile/comments-tile.module';
import OpinionTile from './opinion-tile/opinion-tile.module';
import DebateTile from './debate-tile/debate-tile.module';

import SmoothScroll from '/imports/directives/smooth-scroll';

import ShareDialog from './share-dialog/share-dialog.module'

export default angular
    .module('Topic', [
        ShareDialog,
        TopicControls,
        SummaryTile,
        ArticleTiles,
        CommentsTile,
        OpinionTile,
        DebateTile,
        'smoothScroll'
    ])
    .component('topic', TopicComponent)
    .name;