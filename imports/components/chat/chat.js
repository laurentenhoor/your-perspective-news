import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './chat.html';

class ChatCtrl {
  constructor() {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];
  }
}
 
export default angular.module('allpers.chat', [
  angularMeteor
])
  .component('allpersChat', {
    templateUrl : template,
    controller: ChatCtrl
  });