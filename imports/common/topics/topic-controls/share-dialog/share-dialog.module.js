import angular from 'angular';

import ShareDialogService from './share-dialog.service';

export default angular
    .module('ShareDialog', [])
    .service('$shareDialog', ShareDialogService)
    .name;