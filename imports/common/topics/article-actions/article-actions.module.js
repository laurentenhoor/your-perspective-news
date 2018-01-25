import ArticleActionsButton from './article-actions-button/article-actions-button.module';
import ArticleActionsDialog from './article-actions-dialog/article-actions-dialog.module';

export default angular
    .module('ArticleActions', [
        ArticleActionsButton,
        ArticleActionsDialog,
    ])
    .name;