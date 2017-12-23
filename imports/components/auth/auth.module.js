import angular from 'angular';
import angularMeteor from 'angular-meteor'

import { name as DisplayNameFilter } from '/imports/filters/displayName';
import AuthComponent from './auth.component';

export default
    angular.module('auth', [
        angularMeteor,
        DisplayNameFilter,
    ])
        .component('auth', AuthComponent)
        .name