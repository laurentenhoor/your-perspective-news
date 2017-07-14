import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './chat.html';

import ngSidebarJs from 'angular-sidebarjs';
import './sidebarjs-custom.css';//original file in: node_modules/sidebarjs/dist/sidebarjs.css;

class ChatCtrl {
  constructor() {
    this.tasks = [{
      text: 'Hello'
    }, {
      text: 'Hi'
    }, {
      text: 'How are you?'
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