import angular from 'angular';
import angularMaterial from 'angular-material';

import FirstUseToastService from './first-use-toast.service'
import FirstUseToastComponent from './first-use-toast.component';

export default angular
    .module('firstUseToast', [angularMaterial])
    .controller('FirstUseToastComponent', FirstUseToastComponent)
    .service('$firstUseToast', FirstUseToastService.factory)
    .name