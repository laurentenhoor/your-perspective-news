import angular from 'angular';

import HeaderMenuComponent from './header-menu.component';

export default angular
  .module('HeaderMenu', [
    'Auth',
    'ArticleActions',
  ])
  .component('headerMenu', HeaderMenuComponent)
  .name;