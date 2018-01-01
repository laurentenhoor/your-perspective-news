import angular from 'angular';

import AuthFilters from './auth.filter';
import AuthComponent from './auth.component';
import AuthService from './auth.service';

import AccountMenu from './account-menu/account-menu.module';

export default
    angular.module('Auth', [
        AccountMenu,
    ])
        .component('auth', AuthComponent)
        .service('$auth', AuthService)
        .filter('usernameFilter', AuthFilters.username)
        .filter('profileImageFilter', AuthFilters.profileImage)
        .name