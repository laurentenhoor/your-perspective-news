import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './chat.html';

import ngSidebarJs from 'angular-sidebarjs';
import './sidebarjs-custom.css';// original file in: node_modules/sidebarjs/dist/sidebarjs.css;
import './chat.less';

import { Chat } from '../../api/chat.js';

class ChatCtrl {

	constructor($scope, $http) {

		$scope.viewModel(this);

		this.ip = 'anonymous';

		$http.get("http://freegeoip.net/json/").then(function(response) {
			console.log(response.data.ip);
			this.ip = response.data.ip;
		});

		this.helpers({
			chats() {
				return Chat.find({}, {sort: {createdAt: -1}, limit: 10}).fetch().reverse();
			}
		})
	}

	sendMessage() {
		
		Chat.insert({
			username: ip,
			message: this.newMessage
		});

		// Clear form
		this.newMessage = '';
	}

}

export default angular.module('allpers.chat', [
	angularMeteor, ngSidebarJs
	])
	.component('allpersChat', {
		templateUrl : template,
		controller: ['$scope', '$http', ChatCtrl]
	});