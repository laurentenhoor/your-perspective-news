import angular from 'angular';

import HeaderMenuComponent from './header-menu.component';

import JoinDialog from './join-dialog/join-dialog.module';

export default angular
  .module('HeaderMenu', [
    'Auth',
    'ArticleActions',
    JoinDialog
  ])
  .component('headerMenu', HeaderMenuComponent)
  .name;