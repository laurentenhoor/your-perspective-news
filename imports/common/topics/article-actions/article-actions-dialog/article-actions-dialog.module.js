import angular from 'angular';

import ArticleActionsDialogService from './article-actions-dialog.service';

import httpPrefixDirective from '/imports/directives/http-prefix.directive'

export default angular.module('ArticleActionsDialog', [
    httpPrefixDirective,
])
    .service('$articleActionsDialog', ArticleActionsDialogService)
    .name;