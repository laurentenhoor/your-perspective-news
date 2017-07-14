import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './chat.html';

import ngSidebarJs from 'angular-sidebarjs';
import './sidebarjs-custom.css';//original file in: node_modules/sidebarjs/dist/sidebarjs.css;

class ChatCtrl {
  constructor() {
    this.chats = [{
      text: 'Great article, however very biased to.. '
    }, {
      text: 'What about.. '
    }, {
      text: 'Sharp!'
    }];
  }
}
 
export default angular.module('allpers.chat', [
  angularMeteor, ngSidebarJs
])
  .component('allpersChat', {
    templateUrl : template,
    controller: ChatCtrl
  });