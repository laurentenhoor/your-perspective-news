import angular from 'angular';

import ngClipboard from 'ngclipboard'

import ShareDialogService from './share-dialog.service';

export default angular
    .module('ShareDialog', [
        'ngclipboard'
    ])
    .service('$shareDialog', ShareDialogService)
    .name;