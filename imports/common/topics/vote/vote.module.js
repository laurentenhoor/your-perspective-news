import angular from 'angular';

import VoteService from './vote.service';

export default angular
    .module('Vote', [])
    .service('$vote', VoteService)
    .name;