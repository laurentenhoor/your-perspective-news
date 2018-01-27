import angular from 'angular';

import TopicsApi from './topics-api.service.js'
import ArticlesApi from './articles-api.service.js'
import OpinionsApi from './opinions-api.service.js'
import VotesApi from './votes-api.service.js'
import CommentsApi from './comments-api.service.js'
import UsersApi from './users-api.service.js'
import VotableItemsApi from './votable-items-api.service.js'

export default angular
    .module('ApiServices', [])
    .service('$topicsApi', TopicsApi)
    .service('$articlesApi', ArticlesApi)
    .service('$opinionsApi', OpinionsApi)
    .service('$votesApi', VotesApi)
    .service('$commentsApi', CommentsApi)
    .service('$usersApi', UsersApi)
    .service('$votableItemsApi', VotableItemsApi)
    .name;