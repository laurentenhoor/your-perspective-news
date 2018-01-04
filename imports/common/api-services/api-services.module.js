import angular from 'angular';

import ArticlesApi from './articles-api.service.js'
import OpinionsApi from './opinions-api.service.js'
import VotesApi from './votes-api.service.js'

export default angular
    .module('ApiServices', [])
    .service('$articlesApi', ArticlesApi)
    .service('$opinionsApi', OpinionsApi)
    .service('$votesApi', VotesApi)
    .name;