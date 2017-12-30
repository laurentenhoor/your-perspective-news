import angular from 'angular';
import angularMeteor from 'angular-meteor';

import AccountMenuComponent from './account-menu.component';
import AccountMenuService from './account-menu.service';

export default angular
    .module('AccountMenu', [angularMeteor])
    .component('accountMenu', AccountMenuComponent)
    .service('$accountMenu', AccountMenuService.create)
    .name;