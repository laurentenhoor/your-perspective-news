import angular from 'angular';
import angularMaterial from 'angular-material';

import WriteOpinionDialogService from './write-opinion-dialog.service'

export default angular
    .module('WriteOpinionDialog', [])
    .service('$writeOpinionDialog', WriteOpinionDialogService)
    .name