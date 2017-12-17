import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
 
import template from './authentication.html';
import { name as DisplayNameFilter } from '/imports/filters/displayName';
 
const name = 'authentication';
 
class AuthenticationCtrl {
  constructor($scope, $reactive) {
    'ngInject';
    
    console.log('authentication init');
 
    $reactive(this).attach($scope);
 
    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      }
    });
  }
 
  logout() {
    Accounts.logout();
  }
}
 
// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  templateUrl: template,
  controllerAs: name,
  controller: AuthenticationCtrl
});