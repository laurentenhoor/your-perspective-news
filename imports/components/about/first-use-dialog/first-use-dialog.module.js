import angular from 'angular';
import angularMaterial from 'angular-material';

import FirstUseDialogService from './first-use-dialog.service'

export default angular
    .module('FirstUseDialog', [angularMaterial])
    .service('$firstUseDialog', FirstUseDialogService)
    .name