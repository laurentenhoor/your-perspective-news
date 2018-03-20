import angular from 'angular';

import ShareDialog from './share-dialog/share-dialog.module'

import ShareComponent from './share.component'

export default angular
    .module('Share', [
        ShareDialog
    ])
    .component('share', ShareComponent)
    .name;