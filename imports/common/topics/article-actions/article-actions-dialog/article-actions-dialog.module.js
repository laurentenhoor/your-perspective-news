import angular from 'angular';
import moment from 'moment';
import 'moment/locale/nl';

import ArticleActionsDialogService from './article-actions-dialog.service';

import httpPrefixDirective from '/imports/directives/http-prefix.directive'

export default angular.module('ArticleActionsDialog', [
    httpPrefixDirective,
])
    .service('$articleActionsDialog', ArticleActionsDialogService)
    .config(function($mdDateLocaleProvider) {
        'ngInject';
        $mdDateLocaleProvider.formatDate = function(date) {
           return moment(date).format('dddd DD MMMM');
        };
    })
    .name;