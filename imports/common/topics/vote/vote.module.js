import angular from 'angular';

import VoteComponent from './vote.component';

export default angular
    .module('Vote', [])
    .component('vote', VoteComponent)
    .name;