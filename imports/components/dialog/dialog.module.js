import angular from 'angular';
import angularMaterial from 'angular-material';

import DialogService from './dialog.service';

export default angular
    .module('Dialog', ['ScrollDisabler', angularMaterial])
    .service('$dialog', DialogService)
    .name;