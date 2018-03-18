import angular from 'angular';
import angularMaterial from 'angular-material';

import JoinDialogService from './join-dialog.service'

export default angular
    .module('JoinDialog', [angularMaterial])
    .service('$joinDialog', JoinDialogService)
    .name