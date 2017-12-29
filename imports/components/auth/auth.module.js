import angular from 'angular';
import angularMeteor from 'angular-meteor'

import AuthFilters from './auth.filter';
import AuthComponent from './auth.component';
import AuthService from './auth.service';

export default
    angular.module('Auth', [
        angularMeteor,
    ])
        .component('auth', AuthComponent)
        .service('$auth', AuthService.factory)
        .filter('usernameFilter', () => AuthFilters.Username)
        .name