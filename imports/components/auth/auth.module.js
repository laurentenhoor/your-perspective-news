import angular from 'angular';
import angularMeteor from 'angular-meteor'

import AuthFilters from './auth.filter';
import AuthComponent from './auth.component';

export default
    angular.module('auth', [
        angularMeteor,
    ])
        .component('auth', AuthComponent)
        .filter('usernameFilter', () => AuthFilters.Username)
        .name