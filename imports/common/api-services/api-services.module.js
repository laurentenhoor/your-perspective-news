import angular from 'angular';

import ArticlesApi from './articles-api.service.js'

export default angular
    .module('ApiServices', [])
    .service('$articlesApi', ArticlesApi)
    .name;