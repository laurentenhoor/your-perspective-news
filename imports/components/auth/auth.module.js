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
        .service('$auth', AuthService)
        .filter('usernameFilter', AuthFilters.username)
        .filter('profileImageFilter', AuthFilters.profileImage)
        .name