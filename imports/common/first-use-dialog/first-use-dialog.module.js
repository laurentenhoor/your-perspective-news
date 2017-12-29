import angular from 'angular';
import angularMaterial from 'angular-material';

import FirstUseDialog from './first-use-dialog.service'

export default angular
    .module('FirstUseDialog', [angularMaterial])
    .service('$firstUseDialog', FirstUseDialog.factory)
    .name