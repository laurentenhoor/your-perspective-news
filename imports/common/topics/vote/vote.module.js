import angular from 'angular';

import VoteService from './vote.service';
import VoteComponent from './vote.component';

export default angular
    .module('Vote', [])
    .service('$vote', VoteService)
    .component('vote', VoteComponent)
    .name;