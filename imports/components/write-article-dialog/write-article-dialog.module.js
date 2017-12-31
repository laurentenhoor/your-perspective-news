import angular from 'angular';
import angularMaterial from 'angular-material';

import WriteArticleDialogService from './write-article-dialog.service'

export default angular
    .module('WriteArticleDialog', [])
    .service('$writeArticleDialog', WriteArticleDialogService)
    .name