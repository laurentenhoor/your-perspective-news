import angular from 'angular';

import ArticleActionsDialogService from './article-actions-dialog.service';

import MetadataModule from '/imports/components/metadata/metadata.module'
import httpPrefixDirective from '/imports/directives/http-prefix.directive'

export default angular.module('ArticleActionsDialog', [
    MetadataModule,
    httpPrefixDirective,
])
    .service('$articleActionsDialog', ArticleActionsDialogService.factory)
    .name;