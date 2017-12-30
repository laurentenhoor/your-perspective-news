import angular from 'angular';

import AccountMenuComponent from './account-menu.component';
import AccountMenuService from './account-menu.service';

export default angular
    .module('AccountMenu', [
        'Auth',
    ])
    .component('accountMenu', AccountMenuComponent)
    .service('$accountMenu', AccountMenuService)
    .name;